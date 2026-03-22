(() => {
    const myCss = {
        // 🌿 Base
        "kaapi-bg-soft": "background-color: #f1f5f9",
        "kaapi-card": "background: white; padding: 20px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.08)",

        // 🎨 Colors
        "kaapi-bg-blue": "background-color: #3b82f6",
        "kaapi-text-white": "color: white",
        "kaapi-text-dark": "color: #5074c7",
        "kaapi-text-muted": "color: #4f6483",
        "kaapi-dark-muted": "color: #94a3b8",
        "kaapi-text-purple": "color : purple",

        // 🔠 Typography
        "kaapi-text-xl": "font-size: 24px",
        "kaapi-text-sm": "font-size: 14px",
        "kaapi-font-bold": "font-weight: bold",

        // 📦 Spacing
        "kaapi-p-2": "padding: 8px",
        "kaapi-m-2": "margin: 8px",
        "kaapi-m-4": "margin: 16px",

        // 🔲 Border
        "kaapi-rounded-md": "border-radius: 8px",

        // 🧱 Layout
        "kaapi-flex": "display: flex",
        "kaapi-justify-center": "justify-content: center",
        "kaapi-items-center": "align-items: center",

        // 📐 Container
        "kaapi-container": "max-width: 400px; margin: 60px auto",

        // 🏷️ Tags
        "kaapi-tag": "background: #e2e8f0; color: #0f172a; padding: 4px 10px; border-radius: 999px; font-size: 12px",

        "kaapi-dark-tag": "background: #3733a5; color: #969caf",
        "kaapi-gap-2": "gap: 8px",

        // 🎯 Utility
        "kaapi-text-center": "text-align: center",
        "kaapi-cursor-pointer": "cursor: pointer",

        // 👤 Profile Image
        "kaapi-avatar": "width: 90px; height: 90px; border-radius: 50%; object-fit: cover",

        // ✨ Hover (using transition only)
        "kaapi-transition": "transition: all 0.2s ease",

        // 🎯 Scale effect (we'll toggle via JS)
        "kaapi-scale": "transform: scale(1.05)",

        // 🌙 Dark mode styles
        "kaapi-dark-bg": "background-color: #0f172a",
        "kaapi-dark-card": "background-color: #1e293b; color: white",
        "kaapi-dark-text": "color: white",
        "kaapi-dark-btn": "background-color: #2563eb; color: white",

        // 🧠 Center full screen
        "kaapi-full-center": "height: 100vh; display: flex; justify-content: center; align-items: center; flex-direction: column",

        "kaapi-w-full": "width: 100%",
        "kaapi-justify-end": "justify-content: flex-end",

        "kaapi-dark-card": "background-color: #1a1f36; color: #e0e7ff",
        "kaapi-dark-text": "color: #e0e7ff",
        "kaapi-dark-muted": "color: #a5b4fc",

        // 🔥 new purple button
        "kaapi-dark-btn": "background-color: #7c3aed; color: white",
    };
    const selectAll = document.querySelectorAll('[class*="kaapi"]'); //give nodelist
    const elementArray = Array.from(selectAll);
    console.log(elementArray)

    function applyKaapiStyles(ele) {
        const nameofclass = ele.className; 
        console.log(nameofclass);
        const classArray = nameofclass.split(" ");
        console.log(classArray);

        let finalStr = "";
        classArray.forEach(ele => {
            if (ele.startsWith("kaapi") && myCss[ele]) {
                finalStr += `${myCss[ele]} ; `; //background-color: blue
            }
        })
        ele.style.cssText += finalStr;
    }
    window.addEventListener("DOMContentLoaded", () => {
        elementArray.forEach(ele => {
            applyKaapiStyles(ele);
        });


        // ✅ Set global font
        document.body.style.fontFamily = "system-ui, sans-serif";

        const btn = document.getElementById("connectBtn");
        const darkBtn = document.getElementById("darkBtn");
        const card = document.getElementById("card");

        // 📬 Connect button

        btn.addEventListener("click", () => {
            alert("Connected ✅. Thanks for reaching out!");
        });

        // 🌙 Dark mode 
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("kaapi-dark-bg");
            card.classList.toggle("kaapi-dark-card");

            applyKaapiStyles(document.body);
            applyKaapiStyles(card);
        });
    });
})()

