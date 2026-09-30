---
title: Colaboradores
hideEdit: true
---

<div class="bo-colaboradores-page">
<div id="bo-contributors" class="bo-people">
  <span>Carregando colaboradores...</span>
</div>
</div>

<script>
async function loadContributors() {
  const container = document.getElementById("bo-contributors");

  try {
    const response = await fetch(
      "https://api.github.com/repos/thallesgsrv/Big-O-Library/contributors?per_page=100"
    );

    if (!response.ok) {
      throw new Error("Não foi possível carregar os colaboradores.");
    }

    const contributors = await response.json();

    container.innerHTML = contributors
      .map((person) => {
        const role =
          person.login === "thallesgsrv"
            ? "Criador e mantenedor"
            : "Contribuidor";

        const label =
          person.contributions === 1 ? "contribuição" : "contribuições";

        return `
          <a
            class="bo-person"
            href="${person.html_url}"
            target="_blank"
            rel="noopener"
          >
            <img
              src="${person.avatar_url}&size=96"
              alt="${person.login}"
              width="48"
              height="48"
              loading="lazy"
            >

            <span class="bo-person-text">
              <strong>${person.login}</strong>
              <span>${role}</span>
            </span>

            <span class="bo-person-count">
              <b>${person.contributions}</b>
              <small>${label}</small>
            </span>
          </a>
        `;
      })
      .join("");

  } catch (error) {
    container.innerHTML =
      "<span>Não foi possível carregar os colaboradores.</span>";
  }
}

loadContributors();
</script>