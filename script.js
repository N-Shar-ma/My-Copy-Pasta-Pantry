const snippetsSection = document.querySelector("#snippets")
const newSnippetEl = document.querySelector("#new-snippet")
const snippetTemplate = document.querySelector("#snippet-template")

document.addEventListener("click", handleClick)

function handleClick(e) {
    if(e.target.closest(".copy-button")) {
        copyToClipboard(e.target.closest(".snippet").querySelector(".snippet-text").innerText);
    } else if (e.target.closest("#save-snippet-button")) {
        addNewSnippet(newSnippetEl.textContent)
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function addNewSnippet(text) {
    const snippet = snippetTemplate.content.cloneNode(true)
    snippet.querySelector(".snippet-text").innerText = text
    snippetsSection.appendChild(snippet)
}