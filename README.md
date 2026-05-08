# Mohammed Yousuf Marriage Biodata

Static marriage biodata website for family review and serious marriage inquiries.

## Live Site Setup

This project is ready for GitHub Pages. In the GitHub repository:

1. Go to `Settings`.
2. Open `Pages`.
3. Select branch `main`.
4. Select root folder `/`.
5. Save.

## Access Code

The current access code is `0408`.

The site auto-locks after 5 minutes of inactivity. The `Lock` button also brings the access screen back.

## Profile Photo

To add the profile photo, place the selected image in this folder with this exact filename:

```text
profile-photo.jpg
```

The website and generated PDF will use that image automatically.

Recommended photo: use a clean formal photo with good lighting. The suit photo is better for this biodata than the casual restaurant photo.

## PDF

Use the `Download Biodata PDF` button on the website. The PDF downloads as:

```text
Mohammed_Yousuf_Marriage_Biodata.pdf
```

## Items Still To Update

- Height
- Real profile photo as `profile-photo.jpg`
- Any wording the family wants to adjust before sharing widely

## Privacy Note

The site includes a simple frontend access code for basic privacy. For stronger static-page privacy on GitHub Pages, use an encrypted static-page tool such as StatiCrypt before publishing.

## Free Open-Source Protection Option

This repo includes a ready script for StatiCrypt, a free open-source static HTML encryption tool.

Run this when you want to generate an encrypted version:

```powershell
npm install
npm run protect
```

It creates a protected version inside the `protected` folder using password `0408`.
