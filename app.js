const API = "https://netivly-api.cosielampisz7.workers.dev";
const PUBLIC_R2_URL = "https://pub-7a09632add214d85b55e3b4f71c39208.r2.dev";

let currentThread = null;
let currentCategory = 'main';
let currentThreadPassword = '';
let adminToken = localStorage.getItem('adminToken') || '';
let loadedPostCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (adminToken) {
        const opt = document.getElementById("netivlyAdminOption");
        if (opt) {
            opt.disabled = false;
            opt.innerText = "Netivly (Tryb Admina)";
        }
    }

    // Inicjalizacja motywu przy starcie
    initTheme();
});

/* =========================
   ZARZĄDZANIE MOTYWAMI (SEZONOWE CSS)
========================= */
function initTheme() {
    const savedTheme = localStorage.getItem('netivly_theme') || 'auto';
    const select = document.getElementById('themeSelect');
    if (select) {
        select.value = savedTheme;
    }
    applyTheme(savedTheme);
}

function changeTheme(themeName) {
    localStorage.setItem('netivly_theme', themeName);
    applyTheme(themeName);
}

function applyTheme(themeName) {
    const linkElement = document.getElementById('theme-style');
    if (!linkElement) return;

    let targetFile = 'style.css';

    if (themeName === 'auto') {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-12
        const day = now.getDate();

        // Sezonowość automatyczna
        if (month === 10 && day >= 25 && day <= 31) {
            targetFile = 'halloween.css';
        } else if ((month === 12 && day >= 15) || (month === 1 && day <= 6)) {
            targetFile = 'christmas.css';
        } else {
            targetFile = 'style.css';
        }
    } else if (themeName === 'halloween') {
        targetFile = 'halloween.css';
    } else if (themeName === 'christmas') {
        targetFile = 'christmas.css';
    } else {
        targetFile = 'style.css';
    }

    linkElement.href = targetFile;
}

/* =========================
   HISTORIA I WSTECZ
========================= */
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.threadId) {
        openThread(event.state.threadId, false);
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('cat') || 'main';
        const targetBtn = document.getElementById(`cat-btn-${cat}`);
        switchCategory(cat, targetBtn, false);
        showHomeUI(false);
    }
});

function goBackHome() {
    if (window.history.state && window.history.state.threadId) {
        window.history.back();
    } else {
        showHome();
    }
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    let str = dateStr.replace(" ", "T");
    if (!str.endsWith("Z") && !str.includes("+")) str += "Z";
    const date = new Date(str);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleString();
}

/* =========================
   CZĄSTECZKI
========================= */
const particles = document.getElementById("particles");
if (particles) {
    for (let i = 0; i < 120; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";
        p.style.setProperty("--x", (Math.random() * 180 - 90) + "px");
        p.style.setProperty("--y", (Math.random() * 180 - 90) + "px");
        p.style.animationDuration = (4 + Math.random() * 8) + "s";
        p.style.animationDelay = (Math.random() * 8) + "s";
        particles.appendChild(p);
    }
}

/* =========================
   KOMPRESYJNA KONTROLA ZDJĘĆ (.WEBP)
========================= */
async function compressImage(file) {
    if (!file) return null;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxDim = 1000;

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error("Błąd kompresji pliku."));
                        return;
                    }
                    if (blob.size > 2 * 1024 * 1024) {
                        reject(new Error("Plik po kompresji nadal przekracza 2MB. Wybierz mniejsze zdjęcie."));
                        return;
                    }
                    const compressedFile = new File([blob], "upload.webp", { type: "image/webp" });
                    resolve(compressedFile);
                }, "image/webp", 0.7);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

/* =========================
   PARSER TEKSTU (QoL: LINKI, YT EMBED, CYTATY >>ID)
========================= */
function formatPostContent(rawText) {
    if (!rawText) return { html: "", youtubeEmbeds: [] };

    let text = escapeHTML(rawText);
    const youtubeEmbeds = [];
    
    const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s<]*)?/g;
    
    let match;
    while ((match = ytRegex.exec(text)) !== null) {
        const videoId = match[1];
        if (!youtubeEmbeds.includes(videoId)) {
            youtubeEmbeds.push(videoId);
        }
    }

    const lines = text.split('\n').map(line => {
        line = line.replace(/&gt;&gt;(\d+)/g, (m, id) => {
            return `<a class="post-quote-ref" href="javascript:void(0)" onclick="scrollToPost(${id})">&gt;&gt;${id}</a>`;
        });

        if (line.startsWith('&gt;') && !line.startsWith('&gt;&gt;')) {
            return `<span class="post-greentext">${line}</span>`;
        }

        const urlRegex = /(https?:\/\/[^\s<]+)/g;
        line = line.replace(urlRegex, (url) => {
            return `<a class="post-link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        return line;
    });

    return {
        html: lines.join('\n'),
        youtubeEmbeds: youtubeEmbeds
    };
}

function scrollToPost(postId) {
    const targetPost = document.getElementById(`post-${postId}`);
    if (targetPost) {
        targetPost.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetPost.classList.add('highlight');
        setTimeout(() => targetPost.classList.remove('highlight'), 1500);
    } else {
        alert(`Post #${postId} nie znajduje się w tym wątku.`);
    }
}

/* =========================
   SEKCJE / KATEGORIE
========================= */
function switchCategory(cat, btn, updateUrl = true) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    
    if (!btn) {
        btn = document.getElementById(`cat-btn-${cat}`);
    }
    if (btn) btn.classList.add('active');

    if (updateUrl && !currentThread) {
        const newUrl = cat === 'main' ? window.location.pathname : `?cat=${cat}`;
        window.history.pushState({ category: cat }, "", newUrl);
    }

    loadThreads();
}

/* =========================
   LISTA WĄTKÓW
========================= */
async function loadThreads() {
    const container = document.getElementById("threads");
    if (!container) return;

    try {
        const response = await fetch(`${API}/api/threads?category=${currentCategory}`);
        const threads = await response.json();

        if (!threads || !threads.length) {
            container.innerHTML = `
                <div class="empty">
                    BRAK WĄTKÓW W TEJ KATEGORII<br><br>
                    <span style="color:#222">cisza w próżni</span>
                </div>
            `;
            return;
        }

        threads.sort((a, b) => (b.is_pinned || 0) - (a.is_pinned || 0));

        container.innerHTML = "";

        threads.forEach(thread => {
            const div = document.createElement("div");
            div.className = `thread ${thread.is_pinned ? 'pinned-thread' : ''}`;

            const pinBadge = thread.is_pinned ? `<span class="badge badge-pinned">📌 PINNED</span>` : '';
            const catBadge = thread.category ? `<span class="badge badge-${thread.category}">${thread.category}</span>` : '';

            div.innerHTML = `
                <div class="thread-title">
                    ${pinBadge} #${thread.id} ${escapeHTML(thread.title)}
                </div>
                <div class="thread-meta">
                    <span>${formatDate(thread.created_at)}</span>
                    ${catBadge}
                </div>
            `;

            div.onclick = () => openThread(thread.id, true);
            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = `<div class="empty">BŁĄD POŁĄCZENIA Z NETIVLY API</div>`;
        console.error(error);
    }
}

/* =========================
   TWORZENIE WĄTKU
========================= */
function showCreate() { document.getElementById("createBox").style.display = "block"; }
function hideCreate() { document.getElementById("createBox").style.display = "none"; }

function togglePasswordInput() {
    const cat = document.getElementById("threadCategory").value;
    document.getElementById("threadPassword").style.display = (cat === 'private') ? 'block' : 'none';
}

async function createThread() {
    const title = document.getElementById("threadTitle").value.trim();
    const content = document.getElementById("threadContent").value.trim();
    const category = document.getElementById("threadCategory").value;
    const password = document.getElementById("threadPassword").value.trim();
    const imageFileInput = document.getElementById("threadImage").files[0];

    if (!title || (!content && !imageFileInput)) {
        alert("Podaj temat oraz treść lub zdjęcie posta.");
        return;
    }

    if (category === 'private' && !password) {
        alert("Wprowadź hasło dla wątku prywatnego.");
        return;
    }

    const btn = document.getElementById("btnCreateThread");
    btn.disabled = true;
    btn.innerText = "TWORZENIE...";

    try {
        let compressedFile = null;
        if (imageFileInput) {
            compressedFile = await compressImage(imageFileInput);
        }

        const headers = { "Content-Type": "application/json" };
        if (adminToken) {
            headers["Authorization"] = `Bearer ${adminToken}`;
        }

        const response = await fetch(API + "/api/thread", {
            method: "POST",
            headers,
            body: JSON.stringify({ title, category, password })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.error || "Nie udało się utworzyć wątku.");
            return;
        }

        const formData = new FormData();
        formData.append("thread_id", result.thread_id);
        formData.append("content", content);
        if (compressedFile) {
            formData.append("image", compressedFile);
        }

        const postHeaders = {};
        if (password) postHeaders["X-Thread-Password"] = password;

        await fetch(API + "/api/post", {
            method: "POST",
            headers: postHeaders,
            body: formData
        });

        hideCreate();
        document.getElementById("threadTitle").value = "";
        document.getElementById("threadContent").value = "";
        document.getElementById("threadPassword").value = "";
        document.getElementById("threadImage").value = "";
        
        switchCategory(category);

    } catch (error) {
        alert(error.message || "Nie można połączyć się z API.");
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.innerText = "UTWÓRZ WĄTEK";
    }
}

/* =========================
   OTWIERANIE WĄTKU I CYTOWANIE
========================= */
async function openThread(id, pushHistory = true, isBackgroundRefresh = false) {
    try {
        const createHeaders = (pass) => {
            const h = new Headers();
            if (pass && pass.trim() !== '') {
                h.append("X-Thread-Password", pass);
            }
            if (adminToken) {
                h.append("Authorization", `Bearer ${adminToken}`);
            }
            return h;
        };

        let response = await fetch(`${API}/api/thread/${id}`, {
            method: 'GET',
            headers: createHeaders(currentThreadPassword)
        });

        let data = await response.json();

        if (response.status === 401) {
            if (isBackgroundRefresh) return;
            const pass = prompt("Wątek jest prywatny. Podaj hasło dostępu:");
            if (!pass) return;

            currentThreadPassword = pass;
            response = await fetch(`${API}/api/thread/${id}`, {
                method: 'GET',
                headers: createHeaders(pass)
            });
            data = await response.json();

            if (response.status === 401) {
                alert(data.error || "Niepoprawne hasło!");
                currentThreadPassword = '';
                return;
            }
        }

        if (!response.ok) {
            if (!isBackgroundRefresh) alert(data.error || "Nie udało się otworzyć wątku.");
            return;
        }

        currentThread = id;
        
        if (!isBackgroundRefresh || (data.posts && data.posts.length !== loadedPostCount)) {
            loadedPostCount = data.posts ? data.posts.length : 0;

            if (pushHistory) {
                window.history.pushState({ threadId: id }, "", `?thread=${id}`);
            }

            document.getElementById("home").style.display = "none";
            document.getElementById("board").style.display = "block";

            const board = document.getElementById("boardContent");
            board.innerHTML = `
                <h2 style="color:#eee; font-weight:normal; margin-bottom:25px;">
                    ${data.thread && data.thread.is_pinned ? '📌 ' : ''}#${data.thread ? data.thread.id : id} ${escapeHTML(data.thread ? data.thread.title : '')}
                </h2>
            `;

            if (data.posts && Array.isArray(data.posts)) {
                data.posts.forEach(post => {
                    const div = document.createElement("div");
                    div.className = "post";
                    div.id = `post-${post.id}`;

                    let imageHtml = '';
                    if (post.image_key) {
                        const imgUrl = `${PUBLIC_R2_URL}/${post.image_key}`;
                        imageHtml = `
                            <div class="post-image-container">
                                <a href="${imgUrl}" target="_blank">
                                    <img src="${imgUrl}" class="post-image" alt="Zdjęcie" loading="lazy" />
                                </a>
                            </div>
                        `;
                    }

                    const parsed = formatPostContent(post.content);

                    let contentHtml = '';
                    if (parsed.html && parsed.html.trim() !== "" && post.content !== "(brak treści)") {
                        contentHtml = `<div class="post-content">${parsed.html}</div>`;
                    } else if (!post.image_key) {
                        contentHtml = `<div class="post-content"></div>`;
                    }

                    let ytHtml = '';
                    if (parsed.youtubeEmbeds && parsed.youtubeEmbeds.length > 0) {
                        parsed.youtubeEmbeds.forEach(vId => {
                            ytHtml += `
                                <div class="youtube-embed">
                                    <iframe src="https://www.youtube.com/embed/${vId}" allowfullscreen loading="lazy"></iframe>
                                </div>
                            `;
                        });
                    }

                    div.innerHTML = `
                        <div class="post-head">
                            <span>ANONIM // <span class="post-id-btn" onclick="quotePost(${post.id})">#${post.id}</span></span>
                            <span>${formatDate(post.created_at)}</span>
                        </div>
                        ${contentHtml}
                        ${ytHtml}
                        ${imageHtml}
                    `;
                    board.appendChild(div);
                });
            }
        }

    } catch (error) {
        if (!isBackgroundRefresh) {
            console.error("Błąd podczas odczytu wątku:", error);
            alert("Nie udało się otworzyć wątku.");
        }
    }
}

function quotePost(postId) {
    const textarea = document.getElementById("replyContent");
    const selection = window.getSelection().toString().trim();

    let quoteText = `>>${postId}\n`;
    if (selection) {
        quoteText += selection.split('\n').map(line => `> ${line}`).join('\n') + '\n';
    }

    textarea.value += quoteText;
    textarea.focus();
    textarea.scrollIntoView({ behavior: 'smooth' });
}

/* =========================
   ODPOWIEDŹ
========================= */
async function sendPost() {
    const textarea = document.getElementById("replyContent");
    const imageInput = document.getElementById("replyImage");
    const content = textarea.value.trim();
    const file = imageInput.files[0];

    if (!content && !file) {
        alert("Treść posta lub zdjęcie jest wymagane.");
        return;
    }

    const btn = document.getElementById("btnSendReply");
    btn.disabled = true;
    btn.innerText = "WYSYŁANIE...";

    try {
        let compressedFile = null;
        if (file) {
            compressedFile = await compressImage(file);
        }

        const formData = new FormData();
        formData.append("thread_id", currentThread);
        formData.append("content", content);
        if (compressedFile) {
            formData.append("image", compressedFile);
        }

        const headers = {};
        if (currentThreadPassword && currentThreadPassword.trim() !== '') {
            headers["X-Thread-Password"] = currentThreadPassword;
        }

        const response = await fetch(API + "/api/post", {
            method: "POST",
            headers,
            body: formData
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.error || "Błąd wysyłania.");
            return;
        }

        textarea.value = "";
        imageInput.value = "";
        openThread(currentThread, false);

    } catch (error) {
        alert(error.message || "Błąd połączenia z API.");
    } finally {
        btn.disabled = false;
        btn.innerText = "WYŚLIJ ODPOWIEDŹ";
    }
}

function showHome() {
    const newUrl = currentCategory === 'main' ? window.location.pathname : `?cat=${currentCategory}`;
    window.history.pushState(null, "", newUrl);
    showHomeUI();
}

function showHomeUI(reload = true) {
    currentThread = null;
    currentThreadPassword = '';
    document.getElementById("board").style.display = "none";
    document.getElementById("home").style.display = "block";
    if (reload) loadThreads();
}

function escapeHTML(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/* =========================
   START & AUTO-REFRESH W TLE
========================= */
const urlParams = new URLSearchParams(window.location.search);
const initialThreadId = urlParams.get('thread');
const initialCategory = urlParams.get('cat');

if (initialThreadId) {
    openThread(initialThreadId, false);
} else {
    if (initialCategory && ['main', 'netivly', 'trash', 'private'].includes(initialCategory)) {
        currentCategory = initialCategory;
        const btn = document.getElementById(`cat-btn-${initialCategory}`);
        if (btn) {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }
    loadThreads();
}

setInterval(() => {
    if (currentThread) {
        openThread(currentThread, false, true);
    } else {
        const createBox = document.getElementById("createBox");
        if (!createBox || createBox.style.display !== "block") {
            loadThreads();
        }
    }
}, 10000);
