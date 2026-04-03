function renderTeamCards(members) {
  return members.map((member, i) => `
    <div class="team-card" data-aos="fade-up" data-aos-delay="${i * 150}">
      <div class="team-card-photo">
        <img
          src="${member.photo}"
          alt="${member.name}"
          width="180"
          height="180"
          loading="lazy"
          ${member.photoPosition ? `style="object-position:${member.photoPosition}"` : ''}
          onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\' style=\\'width:100%;height:100%;border-radius:9999px;\\'>Photo</div>'"
        >
      </div>
      <h3 class="team-card-name">${member.name}</h3>
      <p class="team-card-designation">${member.designation}</p>
      ${member.bio ? `<p class="team-card-bio">${member.bio}</p>` : ''}
    </div>
  `).join('');
}
