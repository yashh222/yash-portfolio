const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:4000";

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const stage = document.getElementById("contact-stage");
const loadingPanel = document.getElementById("loading-panel");
const formPanel = document.getElementById("form-panel");
const btn = form?.querySelector("button[type='submit']");
let resetTimer = null;

const setSubmitting = (isSubmitting) => {
  stage?.classList.toggle("is-submitting", isSubmitting);
  formPanel?.setAttribute("aria-hidden", isSubmitting ? "true" : "false");
  loadingPanel?.setAttribute("aria-hidden", isSubmitting ? "false" : "true");
  if (btn) btn.disabled = isSubmitting;
};

const clearResetTimer = () => {
  if (resetTimer) {
    window.clearTimeout(resetTimer);
    resetTimer = null;
  }
};

const finishSubmission = (message, delay = 800) => {
  if (status) status.textContent = message;
  clearResetTimer();
  resetTimer = window.setTimeout(() => {
    setSubmitting(false);
  }, delay);
};

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form) return;

  clearResetTimer();
  setSubmitting(true);

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(payload.error || "Request failed");
    }

    form.reset();
    finishSubmission("Message sent — thank you.");
  } catch (error) {
    finishSubmission(error instanceof Error ? error.message : "Something went wrong. Please try again or email directly.");
  }
});

const resumeBtn = document.getElementById("resume-btn");
resumeBtn?.addEventListener("click", async () => {
  const email = window.prompt("Enter your email to download the resume:");
  if (!email) return;
  try {
    const res = await fetch(`${API_URL}/api/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(payload.error || "Unable to fetch resume.");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Yash_Barhate_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    window.alert(error instanceof Error ? error.message : "Unable to download resume right now.");
  }
});
