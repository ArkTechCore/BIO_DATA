const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const pdfButtons = document.querySelectorAll("[data-download-pdf]");
const lockButton = document.querySelector("#lock-button");
const photoTrack = document.querySelector(".photo-track");
const photoSlides = document.querySelectorAll(".photo-slide");
const sliderButtons = document.querySelectorAll("[data-slide]");
const sliderDots = document.querySelectorAll(".slider-dots span");
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

let currentSlide = 0;

function showSlide(index) {
  if (!photoTrack || !photoSlides.length) return;

  currentSlide = (index + photoSlides.length) % photoSlides.length;
  photoTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  sliderDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
}

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.slide === "next" ? 1 : -1;
    showSlide(currentSlide + direction);
  });
});

let touchStartX = 0;

if (photoTrack) {
  photoTrack.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  photoTrack.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) > 40) {
        showSlide(currentSlide + (distance < 0 ? 1 : -1));
      }
    },
    { passive: true }
  );
}

if (photoSlides.length > 1) {
  window.setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5500);
}

const personalDetails = [
  ["Full Name", "Mohammed Yousuf"],
  ["Date of Birth", "October 28, 2004"],
  ["Age", "21 Years"],
  ["Height", "To be updated"],
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
      "I am currently pursuing my Bachelor's in Computer Science & Information Technology at Monroe University in the United States. My expected graduation is in 2027. I am interested in software development and practical technology that can be used in real situations.",
  },
  {
    title: "Work & Professional Background",
    body:
      "Along with my studies, I work in a convenience retail store in the United States. I also help the same business with software-related work when needed. I have been involved in building a customer loyalty application and simple tools that support store operations and customer engagement. This has helped me learn how technology can be useful in a real business setting.",
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
    title: "About Me",
    body:
      "I am generally calm and practical by nature. I prefer speaking clearly, keeping respect in conversations, and handling responsibilities without making unnecessary noise about them. I like building things, solving problems, learning new ideas, and thinking deeply about the future. At the same time, I believe a person should remain humble and easy to deal with.",
  },
  {
    title: "Lifestyle",
    body:
      "I prefer a simple and disciplined lifestyle. I do not smoke or drink alcohol. I value modesty, clean habits, respect for family, and a balanced approach between deen and dunya.",
  },
  {
    title: "Interests",
    body:
      "My interests include Islamic learning, beneficial lectures, Islamic history, technology, software development, business ideas, and self-improvement.",
  },
  {
    title: "Future Vision",
    body:
      "InshaAllah, I want to complete my education and continue growing professionally. I hope to use my skills in a meaningful way and keep improving with time. More than anything, I want a stable halal future, meaningful work, and a family life built with Islamic values and responsibility.",
  },
  {
    title: "Marriage Expectations",
    body:
      "I am looking for someone who values deen, good character, sincerity, modesty, respect, family, emotional maturity, and communication. I hope for a marriage where both people are kind to each other and understand the responsibility of building a home. I prefer simplicity in marriage and believe family involvement is important. Marriage timeline: Open to marriage with mutual understanding while continuing education and professional growth.",
  },
];

function loadImageData(url) {
  return new Promise((resolve) => {
    const image = new Image();
    if (window.location.protocol.startsWith("http")) {
      image.crossOrigin = "anonymous";
    }

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      resolve({
        dataUrl: canvas.toDataURL("image/jpeg", 0.9),
        width: image.naturalWidth,
        height: image.naturalHeight,
        element: image,
      });
    };

    image.onerror = () => resolve(null);
    image.src = url;
  });
}

function addImageContained(doc, image, x, y, maxWidth, maxHeight) {
  if (!image) return;

  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
  const width = image.width * ratio;
  const height = image.height * ratio;
  const centeredX = x + (maxWidth - width) / 2;
  const centeredY = y + (maxHeight - height) / 2;

  doc.addImage(image.dataUrl, "JPEG", centeredX, centeredY, width, height);
}

function addImageCover(doc, image, x, y, boxWidth, boxHeight) {
  if (!image) return;

  const canvas = document.createElement("canvas");
  const scale = Math.max(boxWidth / image.width, boxHeight / image.height);
  const sourceWidth = boxWidth / scale;
  const sourceHeight = boxHeight / scale;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;
  canvas.width = Math.round(boxWidth * 8);
  canvas.height = Math.round(boxHeight * 8);
  const context = canvas.getContext("2d");

  context.drawImage(
    image.element,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  doc.addImage(canvas.toDataURL("image/jpeg", 0.9), "JPEG", x, y, boxWidth, boxHeight);
}

async function addPhotoPage(doc) {
  const formalPhoto = await loadImageData("profile-photo.jpg");
  const naturalPhoto = await loadImageData("secondary-photo.jpg");

  if (!formalPhoto && !naturalPhoto) return;

  doc.addPage();
  doc.setFillColor(255, 253, 248);
  doc.rect(0, 0, 210, 297, "F");
  doc.setDrawColor(185, 143, 57);
  doc.setLineWidth(0.8);
  doc.rect(9, 9, 192, 279);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(18, 63, 50);
  doc.text("Photos", 105, 24, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.8);
  doc.setTextColor(64, 80, 72);
  doc.text("Included for family review.", 105, 32, { align: "center" });

  doc.setDrawColor(185, 143, 57);
  doc.setLineWidth(0.45);
  doc.rect(14, 44, 88, 160);
  doc.rect(108, 44, 88, 160);
  addImageCover(doc, formalPhoto, 16, 46, 84, 156);
  addImageCover(doc, naturalPhoto, 110, 46, 84, 156);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(18, 63, 50);
  doc.text("Formal Photo", 58, 214, { align: "center" });
  doc.text("Additional Photo", 152, 214, { align: "center" });
}

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

  await addPhotoPage(doc);
  addFooter(doc);
  doc.save("Mohammed_Yousuf_Marriage_Biodata.pdf");
}

pdfButtons.forEach((button) => {
  button.addEventListener("click", generateBiodataPdf);
});
