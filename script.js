const snippetsSection = document.querySelector("#snippets")
const newSnippetEl = document.querySelector("#new-snippet")
const snippetTemplate = document.querySelector("#snippet-template")
const fab = document.querySelector("#fab")

const LOCAL_STORAGE_KEY = "copyPastaSnippets"

let snippets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
snippets.forEach(({text, id}) => displaySnippet(createSnippetElement(text, id)))

document.addEventListener("click", handleClick)

function handleClick(e) {
    if(e.target.closest(".copy-button")) {
        copyToClipboard(e.target.closest(".snippet").querySelector(".snippet-text").innerText);
    } else if (e.target.closest("#save-snippet-button")) {
        addNewSnippet(newSnippetEl.value)
        newSnippetEl.value = ""
    } else if (e.target.closest(".delete-button")) {
        deleteSnippet(e.target.closest(".snippet"))
    } else if (e.target.closest("#fab")) {
        fab.classList.add("hidden")
        newSnippetEl.parentElement.classList.remove("hidden")
    } else if (e.target.closest("#hide-input-area-button")) {
        fab.classList.remove("hidden")
        newSnippetEl.parentElement.classList.add("hidden")
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function addNewSnippet (text) {
    if(text.trim()=="") return
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

function displaySnippet (snippetEl) {
    snippetsSection.appendChild(snippetEl)
}

function deleteSnippet (snippetEl) {
    snippets = snippets.filter(snippet => snippet.id!==snippetEl.id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snippets))
    snippetEl.remove()
}