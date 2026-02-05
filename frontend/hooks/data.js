export async function getslider(page) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/getsliderbypage/${page}`, {
    next: { tags: ["sliders"] },
  });
  const data = await res.json();
  return data;
}
export async function getsitesettings() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sitesettings`, {
    next: { tags: ["sitesettings"] },
  });
  const data = await res.json();
  return data;
}

export async function getaboutus() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/getaboutus`, {
    next: { tags: ["aboutus"] },
  });
  const data = await res.json();
  return data;
}

// export async function getwhychooseus() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/getallwhychooseus`, {
//     next: { tags: ["whychooseus"] },
//   });
//   const data = await res.json();
//   return data;
// }
// export async function getourteam() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/getallourteam`, {
//     next: { tags: ["ourteam"] },
//   });
//   const data = await res.json();
//   return data;
// }

// export async function gettestimonials() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/getalltestimonial`, {
//     next: { tags: ["testimonials"] },
//   });
//   const data = await res.json();
//   return data;
// }
// export async function getservices() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/getallservices`, {
//     next: { tags: ["services"] },
//   });
//   const data = await res.json();
//   return data;
// }

// export async function getfaq() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/getfaq`, {
//     next: { tags: ["faq"] },
//   });
//   const data = await res.json();
//   return data;
// }

// export async function getmenu() {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/getallmenu`, {
//     next: { tags: ["menu"] },
//   });
//   const data = await res.json();
//   return data;
// }

// export async function getcachedmenucategory() {
//   const res = await fetch(
//     `${process.env.BACKEND_URL}/api/getallmenucategory?page=1&limit=2`,
//     { next: { tags: ["menucategorypage-1"] } }
//   );
//   const data = await res.json();
//   return data;
// }

export async function getcachedgallery() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/getallgallery?page=1&limit=9`,
    { next: { tags: ["homegallery"] } }
  );
  const data = await res.json();
  return data;
}

export async function getvideos() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/getallvideo`, {
    next: { tags: ["videos"] },
  });

  const data = await res.json();
  return data;
}

export async function getmetadata() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/getallmetadata`, {
    next: { tags: ["meta"] },
  });
  const data = await res.json();
  return data;
}

export async function getuserquestionbypagename(page) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/getuserquestionbypagename/${page}`,
    { next: { tags: ["belowslidercontent"] } }
  );
  const data = await res.json();
  return data;
}

export async function getcontentbypage(page) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/getcontentbypage/${page}`,
    { next: { tags: ["pageContent"] } }
  );
  const data = await res.json();
  return data;
}

export async function getservicesbyslug(slug) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/getsingleservicebyslug/${slug}`,
    { next: { tags: [`services/${slug}`] } }
  );
  const data = await res.json();
  return data;
}
