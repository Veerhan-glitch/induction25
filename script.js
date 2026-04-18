document.addEventListener('DOMContentLoaded', () => {
    console.log("Script initialized. Starting Excel fetch...");

    const sheetId = '1YdBnzSVSvL7EkFFUY4p0XWrL-swFdtrIFo_vr_8mFgk';
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&range=A1`;
    const container = document.querySelector('.schedule-container');
    const dayLabel = document.getElementById('day-label');

    // Update Label for 2026
    if (dayLabel) dayLabel.innerText = "AWAITING SCHEDULE (2026)";

    async function fetchPlaceholder() {
        console.log(`Fetching from: ${url}`);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const text = await response.text();
            console.log("Raw Data from Excel:", text);

            // Clean the URL (remove quotes and whitespace)
            const cleanUrl = text.replace(/"/g, '').trim();
            console.log("Cleaned URL:", cleanUrl);

            if (cleanUrl.startsWith('http')) {
                console.log("Valid URL found. Injecting image...");
                
                // Clear existing schedule content and add the placeholder image
                container.innerHTML = `
                    <div style="display: flex; justify-content: center; width: 100%; padding: 20px;">
                        <img src="${cleanUrl}" id="dynamic-placeholder" alt="Induction 26" 
                             style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                    </div>
                `;

                // Log if the image itself fails to load
                const img = document.getElementById('dynamic-placeholder');
                img.onerror = () => {
                    console.error("The URL exists, but the image failed to load. Check if it's a DIRECT link (ends in .png/.jpg)");
                    useFallback();
                };
            } else {
                console.warn("Cell A1 does not contain a valid HTTP link. Using local fallback.");
                useFallback();
            }

        } catch (error) {
            console.error("Fetch Process Failed:", error);
            console.log("Tip: Ensure the sheet is 'Published to Web' and shared as 'Anyone with the link can view'.");
            useFallback();
        }
    }

    function useFallback() {
        console.log("Applying local fallback: IMAGES/induction.png");
        container.innerHTML = `
            <div style="display: flex; justify-content: center; width: 100%; padding: 20px;">
                <img src="IMAGES/induction.png" alt="Induction 26 Fallback" style="max-width: 100%; height: auto;">
            </div>
        `;
    }

    fetchPlaceholder();
});