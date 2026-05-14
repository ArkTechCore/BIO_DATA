const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const pdfButtons = document.querySelectorAll("[data-download-pdf]");
const lockButton = document.querySelector("#lock-button");
const accessScreen = document.querySelector("#access-screen");
const accessForm = document.querySelector("#access-form");
const accessCodeInput = document.querySelector("#access-code");
const accessError = document.querySelector("#access-error");
const accessCode = "0408";
const autoLockDelay = 5 * 60 * 1000;
let autoLockTimer;

function unlockBiodata() {
  document.body.classList.remove("locked");
  accessScreen?.classList.add("is-hidden");
  window.localStorage.setItem("biodataAccess", "granted");
  scheduleAutoLock();
}

function lockBiodata() {
  window.localStorage.removeItem("biodataAccess");
  window.location.reload();
}

function scheduleAutoLock() {
  window.clearTimeout(autoLockTimer);
  autoLockTimer = window.setTimeout(lockBiodata, autoLockDelay);
}

if (window.localStorage.getItem("biodataAccess") === "granted") {
  unlockBiodata();
} else {
  accessCodeInput?.focus();
}

if (accessForm) {
  accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const enteredCode = accessCodeInput.value.trim();

    if (enteredCode === accessCode) {
      unlockBiodata();
      return;
    }

    accessError.textContent = "Please enter the correct access code.";
    accessCodeInput.select();
  });
}

if (lockButton) {
  lockButton.addEventListener("click", () => {
    lockBiodata();
  });
}

["click", "keydown", "scroll", "touchstart"].forEach((eventName) => {
  window.addEventListener(
    eventName,
    () => {
      if (window.localStorage.getItem("biodataAccess") === "granted") {
        scheduleAutoLock();
      }
    },
    { passive: true }
  );
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const personalDetails = [
  ["Full Name", "Mohammed Yousuf"],
  ["Date of Birth", "October 28, 2004"],
  ["Age", "21 Years"],
  ["Height", "5'6\""],
  ["Complexion", "Fair"],
  ["Build", "Average"],
  ["Religion", "Islam"],
  ["Madhhab", "Hanafi"],
  ["Sect", "Ahle Sunnah wal Jama'ah"],
  ["Marital Status", "Never Married"],
  ["Nationality", "Indian"],
  ["Mother Tongue", "Urdu"],
  ["Languages Known", "English, Urdu, Hindi"],
  ["Current Residence", "Jersey City, NJ 07306, United States"],
  ["Permanent Address India", "17-1-181/M/90/A, Darabjung Colony, Madanapet, Hyderabad, Telangana, India - 500059"],
  ["Native Place", "Hyderabad, Telangana, India"],
  ["Immigration Status", "F-1 Student Visa, United States"],
];

const familyDetails = [
  ["Father", "Mohammed Wajeed"],
  ["Father's Occupation", "Government Employee, GHMC Supervisor"],
  ["Mother", "Zareena Begum"],
  ["Mother's Occupation", "Homemaker"],
  ["Siblings", "3 younger sisters\n1. Bachelor's in Pharmacy\n2. Intermediate (Science)\n3. School"],
];

const biodataSections = [
  {
    title: "Education",
    body:
      "I am currently pursuing my Bachelor's degree at Monroe University in the United States. I am expected to finish by the end of this year. I believe education should help a person grow in responsibility, discipline, and practical understanding.",
  },
  {
    title: "Work & Professional Background",
    body:
      "Along with my studies, I work in a convenience retail store in the United States. I also do freelance work for the same business when needed. On the freelance side, I am working on a customer loyalty application and a deal engine with backend support for the business. I keep this work practical and simple, mainly focused on helping daily store operations run more smoothly.",
  },
  {
    title: "Family Details",
    body:
      "Alhamdulillah, I belong to a close-knit Muslim family from Hyderabad. My family values deen, respect, education, simplicity, and good character.",
  },
  {
    title: "Extended Family",
    body:
      "My father has four elder brothers and one younger brother. His elder brothers include Mohammed Haji (Rahimahullah), Mohammed Sajid Ali, Retired Government Employee, and Mohammed Majid Ali, who owns an automobile parts business. My father, Mohammed Wajeed, is a Government Employee working as a GHMC Supervisor. His younger brother, Mohammed Mujahid, recently retired after working in Saudi Arabia.",
  },
  {
    title: "Religious Values",
    body:
      "I follow the Hanafi madhhab and Ahle Sunnah wal Jama'ah. Faith is important in my life, and I try to stay connected with deen, offer salah regularly, and keep Islamic principles in mind in personal and family matters. I appreciate Islamic learning, beneficial lectures, and reminders that help a person improve. I believe marriage should be built on deen, sincerity, respect, mercy, and understanding.",
  },
  {
    title: "Lifestyle",
    body:
      "I prefer a simple and disciplined lifestyle. I do not smoke or drink alcohol. I value modesty, clean habits, respect for family, and a balanced approach between deen and dunya.",
  },
];

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    doc.setPage(pageNumber);
    doc.setDrawColor(18, 63, 50);
    doc.setLineWidth(0.2);
    doc.line(14, 284, 196, 284);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(105, 116, 109);
    doc.text("Marriage Biodata - Mohammed Yousuf", 14, 290);
    doc.text(`Page ${pageNumber} of ${pageCount}`, 196, 290, { align: "right" });
  }
}

function ensureSpace(doc, y, needed = 32) {
  if (y + needed > 276) {
    doc.addPage();
    return 18;
  }

  return y;
}

function addSection(doc, title, body, y) {
  const marginX = 14;
  const maxWidth = 182;
  let nextY = ensureSpace(doc, y, 34);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(18, 63, 50);
  doc.text(title, marginX, nextY);
  nextY += 3;
  doc.setDrawColor(185, 143, 57);
  doc.setLineWidth(0.4);
  doc.line(marginX, nextY, 196, nextY);
  nextY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.2);
  doc.setTextColor(40, 51, 45);
  const lines = doc.splitTextToSize(body, maxWidth);

  lines.forEach((line) => {
    nextY = ensureSpace(doc, nextY, 8);
    doc.text(line, marginX, nextY);
    nextY += 5.2;
  });

  return nextY + 6;
}

async function generateBiodataPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF generator is still loading. Please try again in a moment.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  if (typeof doc.autoTable !== "function") {
    alert("PDF table formatter is still loading. Please try again in a moment.");
    return;
  }

  doc.setProperties({
    title: "Mohammed Yousuf - Marriage Biodata",
    subject: "Marriage Biodata",
    author: "Mohammed Yousuf",
  });

  doc.setFillColor(255, 253, 248);
  doc.rect(0, 0, 210, 297, "F");
  doc.setDrawColor(185, 143, 57);
  doc.setLineWidth(0.8);
  doc.rect(9, 9, 192, 279);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(18, 63, 50);
  doc.text("Bismillah ir-Rahman ir-Raheem", 105, 22, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Mohammed Yousuf", 105, 34, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(185, 143, 57);
  doc.text("Marriage Biodata", 105, 43, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.8);
  doc.setTextColor(64, 80, 72);
  const intro =
    "Shared for family review and serious marriage inquiries only.";
  doc.text(intro, 105, 52, { align: "center", maxWidth: 170 });

  doc.autoTable({
    startY: 58,
    head: [["Personal Details", ""]],
    body: personalDetails,
    theme: "grid",
    margin: { left: 14, right: 14 },
    styles: {
      font: "helvetica",
      fontSize: 9.2,
      cellPadding: 2.5,
      lineColor: [218, 209, 189],
      lineWidth: 0.2,
      valign: "top",
    },
    headStyles: {
      fillColor: [18, 63, 50],
      textColor: [255, 253, 248],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 58, fontStyle: "bold", textColor: [18, 63, 50], fillColor: [248, 241, 229] },
      1: { cellWidth: 124, textColor: [38, 51, 45] },
    },
  });

  let y = doc.lastAutoTable.finalY + 10;

  biodataSections.forEach((section) => {
    y = addSection(doc, section.title, section.body, y);

    if (section.title === "Family Details") {
      y = ensureSpace(doc, y, 38);
      doc.autoTable({
        startY: y,
        body: familyDetails,
        theme: "grid",
        margin: { left: 14, right: 14 },
        styles: {
          font: "helvetica",
          fontSize: 9.3,
          cellPadding: 2.4,
          lineColor: [218, 209, 189],
          lineWidth: 0.2,
          valign: "top",
        },
        columnStyles: {
          0: { cellWidth: 58, fontStyle: "bold", textColor: [18, 63, 50], fillColor: [248, 241, 229] },
          1: { cellWidth: 124, textColor: [38, 51, 45] },
        },
      });
      y = doc.lastAutoTable.finalY + 10;
    }
  });

  y = ensureSpace(doc, y, 44);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(18, 63, 50);
  doc.text("Contact Details", 14, y);
  y += 3;
  doc.setDrawColor(185, 143, 57);
  doc.line(14, y, 196, y);
  y += 7;

  doc.autoTable({
    startY: y,
    body: [
      ["Phone", "+1 551-998-3397"],
      ["Email", "yousufcodes7@gmail.com"],
      ["Family Contact", "+91 8977649262"],
      ["WhatsApp", "https://wa.me/message/7K6KBEBY376SH1"],
    ],
    theme: "grid",
    margin: { left: 14, right: 14 },
    styles: {
      font: "helvetica",
      fontSize: 9.6,
      cellPadding: 2.8,
      lineColor: [218, 209, 189],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 58, fontStyle: "bold", textColor: [18, 63, 50], fillColor: [248, 241, 229] },
      1: { cellWidth: 124, textColor: [38, 51, 45] },
    },
  });

  addFooter(doc);
  doc.save("Mohammed_Yousuf_Marriage_Biodata.pdf");
}

pdfButtons.forEach((button) => {
  button.addEventListener("click", generateBiodataPdf);
});
