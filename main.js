const STORAGE_KEY = "arts-oversight-applications";

const blogData = [
    {
        category: "문화예술기획",
        title: "예술 프로젝트는 아이디어보다 운영 구조가 먼저 설계되어야 한다",
        summary:
            "좋은 기획안이 실제 현장에서 지속성을 가지려면 예산, 파트너십, 관객 접점, 팀 운영 방식까지 함께 설계되어야 합니다.",
        readTime: "5 min read",
    },
    {
        category: "예술경영",
        title: "지원금 이후를 준비하는 조직만이 브랜드를 남긴다",
        summary:
            "단년도 사업 성과에 머무르지 않고 후속 수익 구조와 관객 관계를 구축하는 운영 전략이 예술 조직의 체질을 바꿉니다.",
        readTime: "7 min read",
    },
    {
        category: "독서모임",
        title: "스터디는 정보 습득이 아니라 해석의 언어를 함께 만드는 장치다",
        summary:
            "문화예술 분야 스터디는 책을 읽는 데서 끝나지 않고, 각자의 현장에 적용 가능한 질문을 발굴하는 방식으로 설계되어야 합니다.",
        readTime: "4 min read",
    },
    {
        category: "관객개발",
        title: "관객 데이터가 아니라 관객 서사를 읽어야 기획이 살아난다",
        summary:
            "숫자 중심 보고서만으로는 관객의 맥락을 이해하기 어렵습니다. 반복 방문 이유와 이탈 이유를 서사적으로 해석해야 합니다.",
        readTime: "6 min read",
    },
];

const studyData = [
    {
        title: "문화예술 기획 실전 스터디",
        description:
            "공공지원사업, 민간 협업, 프로그램 구조화까지 실제 제안서와 실행안을 함께 다루는 기획 중심 스터디입니다.",
        target: "신진 기획자 · 실무자",
        schedule: "매주 수요일 19:30",
        format: "6주 / 온라인",
    },
    {
        title: "예술경영 독서모임",
        description:
            "예술경영, 브랜딩, 조직 운영 관련 도서를 읽고 각자의 현장에 적용할 전략적 인사이트를 도출하는 토론형 모임입니다.",
        target: "예술단체 운영자 · 기획자",
        schedule: "격주 토요일 10:00",
        format: "8회 / 오프라인+온라인 병행",
    },
    {
        title: "전시 기획 워크숍",
        description:
            "전시 콘셉트 도출, 동선 설계, 해설 구조, 협업 파트너 정리까지 전시를 하나의 경험으로 설계하는 실습 프로그램입니다.",
        target: "전시 기획 입문 · 독립 큐레이터",
        schedule: "매주 일요일 14:00",
        format: "4주 / 오프라인",
    },
];

function loadApplications() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to load applications:", error);
        return [];
    }
}

function saveApplications(applications) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };

        return entities[char];
    });
}

function createInsightCard(post, index) {
    return `
        <article class="insight-card reveal" style="animation-delay: ${index * 90}ms">
            <span class="insight-card__tag">${escapeHtml(post.category)}</span>
            <div>
                <h3>${escapeHtml(post.title)}</h3>
                <p class="insight-card__body">${escapeHtml(post.summary)}</p>
            </div>
            <div class="insight-card__footer">
                <span>${escapeHtml(post.readTime)}</span>
                <span>Archive Note</span>
            </div>
        </article>
    `;
}

function createStudyCard(study, index) {
    return `
        <article class="study-card reveal" style="animation-delay: ${index * 100}ms">
            <span class="study-card__tag">Now Recruiting</span>
            <div>
                <h3>${escapeHtml(study.title)}</h3>
                <p>${escapeHtml(study.description)}</p>
            </div>
            <div class="study-meta">
                <span>${escapeHtml(study.target)}</span>
                <span>${escapeHtml(study.schedule)}</span>
                <span>${escapeHtml(study.format)}</span>
            </div>
            <button class="button button--primary apply-button" type="button" data-study="${escapeHtml(study.title)}">
                이 스터디 신청하기
            </button>
        </article>
    `;
}

function renderInsights() {
    const container = document.getElementById("blog-posts");
    container.innerHTML = blogData.map(createInsightCard).join("");
}

function renderStudies() {
    const container = document.getElementById("study-groups");
    container.innerHTML = studyData.map(createStudyCard).join("");
}

function createApplicationItem(application) {
    return `
        <article class="application-item">
            <h4>${escapeHtml(application.studyTitle)} · ${escapeHtml(application.name)}</h4>
            <p class="application-item__meta">
                ${escapeHtml(application.age)}세 / ${escapeHtml(application.gender)} / ${escapeHtml(application.phone)}
                <br>
                ${escapeHtml(application.email)} · 관심분야: ${escapeHtml(application.interest)}
            </p>
            <p class="application-item__body">${escapeHtml(application.goal)}</p>
        </article>
    `;
}

function renderApplications() {
    const applications = loadApplications();
    const list = document.getElementById("application-list");
    const count = document.getElementById("application-count");

    count.textContent = `${applications.length}건`;
    if (applications.length === 0) {
        list.innerHTML = '<p class="empty-state">아직 접수된 신청이 없습니다.</p>';
        return;
    }

    list.innerHTML = applications
        .slice()
        .reverse()
        .map(createApplicationItem)
        .join("");
}

function validateForm(data) {
    const age = Number(data.age);
    const phonePattern = /^[0-9+\-\s]{9,20}$/;

    if (!data.name.trim()) {
        return "이름을 입력해주세요.";
    }

    if (!Number.isInteger(age) || age < 1 || age > 120) {
        return "나이는 1세 이상 120세 이하로 입력해주세요.";
    }

    if (!data.gender) {
        return "성별을 선택해주세요.";
    }

    if (!phonePattern.test(data.phone.trim())) {
        return "휴대전화번호 형식을 확인해주세요.";
    }

    if (!data.email.includes("@")) {
        return "메일주소 형식을 확인해주세요.";
    }

    if (!data.interest.trim()) {
        return "관심분야를 입력해주세요.";
    }

    if (data.goal.trim().length < 10) {
        return "지향점은 10자 이상 작성해주세요.";
    }

    return "";
}

function setupModal() {
    const modal = document.getElementById("application-modal");
    const form = document.getElementById("study-application-form");
    const message = document.getElementById("form-message");
    const selectedStudyTitle = document.getElementById("selected-study-title");
    const selectedStudyInput = document.getElementById("selected-study-input");
    const closeButton = document.getElementById("close-modal");
    const cancelButton = document.getElementById("cancel-modal");

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest(".apply-button");
        if (!trigger) {
            return;
        }

        const studyTitle = trigger.dataset.study ?? "스터디 신청";
        selectedStudyTitle.textContent = studyTitle;
        message.textContent = "";
        form.reset();
        selectedStudyInput.value = studyTitle;
        modal.showModal();
    });

    function closeModal() {
        modal.close();
        form.reset();
        message.textContent = "";
    }

    closeButton.addEventListener("click", closeModal);
    cancelButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const application = {
            studyTitle: formData.get("studyTitle")?.toString() ?? "",
            name: formData.get("name")?.toString() ?? "",
            age: formData.get("age")?.toString() ?? "",
            gender: formData.get("gender")?.toString() ?? "",
            phone: formData.get("phone")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            interest: formData.get("interest")?.toString() ?? "",
            goal: formData.get("goal")?.toString() ?? "",
        };

        const validationMessage = validateForm(application);
        if (validationMessage) {
            message.textContent = validationMessage;
            return;
        }

        const applications = loadApplications();
        applications.push(application);
        saveApplications(applications);
        renderApplications();
        message.textContent = "신청이 저장되었습니다.";

        window.setTimeout(() => {
            closeModal();
            window.location.hash = "application";
        }, 600);
    });
}

function setupApplicationActions() {
    const clearButton = document.getElementById("clear-applications");
    clearButton.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEY);
        renderApplications();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderInsights();
    renderStudies();
    renderApplications();
    setupModal();
    setupApplicationActions();
});
