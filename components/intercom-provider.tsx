"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Intercom: any
    intercomSettings: any
  }
}

export function IntercomProvider() {
  useEffect(() => {
    // Initialize Intercom
    window.intercomSettings = {
      api_base: "https://api-iam.intercom.io",
      app_id: "h0qus6db",
    }

    // Load Intercom script
    const script = document.createElement("script")
    script.innerHTML = `
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/h0qus6db';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    `
    document.body.appendChild(script)

    // Boot Intercom
    if (window.Intercom) {
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "h0qus6db",
      })
    }

    return () => {
      // Cleanup on unmount
      if (window.Intercom) {
        window.Intercom("shutdown")
      }
    }
  }, [])

  return null
}
