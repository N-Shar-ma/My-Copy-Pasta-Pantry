const snippetsSection = document.querySelector("#snippets")
const newSnippetEl = document.querySelector("#new-snippet")
const snippetTemplate = document.querySelector("#snippet-template")

const LOCAL_STORAGE_KEY = "copyPastaSnippets"

let snippets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
snippets.forEach(({text, id}) => displaySnippet(createSnippetElement(text, id)))

document.addEventListener("click", handleClick)

function handleClick(e) {
    if(e.target.closest(".copy-button")) {
        copyToClipboard(e.target.closest(".snippet").querySelector(".snippet-text").innerText);
    } else if (e.target.closest("#save-snippet-button")) {
        addNewSnippet(newSnippetEl.value)
    } else if (e.target.closest(".delete-button")) {
        deleteSnippet(e.target.closest(".snippet"))
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function addNewSnippet (text) {
    const id = Date.now().toString()
    saveSnippetObject(text, id)
    const snippet = createSnippetElement(text, id)
    displaySnippet(snippet)
}

function saveSnippetObject (text, id) {
    snippets.push({ text, id });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snippets))
}

function createSnippetElement (text, id) {
    const snippet = snippetTemplate.content.cloneNode(true)
    snippet.querySelector(".snippet-text").innerText = text
    snippet.querySelector(".snippet").id = id
    return snippet
}

function displaySnippet (snippet) {
    snippetsSection.appendChild(snippet)
}

function deleteSnippet (snippetEl) {
    snippets = snippets.filter(snippet => snippet.id!==snippetEl.id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snippets))
    snippetEl.remove()
}