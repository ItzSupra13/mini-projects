let speech = new SpeechSynthesisUtterance();
let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voices.forEach(voice => {
        let option = document.createElement("option");
        option.textContent = voice.name + " (" + voice.lang + ")";
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}
document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value;
    const selectedVoice = document.querySelector("select").value;
    speech.text = text;
    speech.voice = voices.find(voice => voice.name === selectedVoice);
    window.speechSynthesis.speak(speech);
});