const NOW_PLAYING = {
  titulo: "Kirby: Squeak Squad",
  enlace: "https://kirby.nintendo.com/about/",
  imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsICAoIBwsKCQoNDAsNERwSEQ8PESIZGhQcKSQrKigkJyctMkA3LTA9MCcnOEw5PUNFSElIKzZPVU5GVEBHSEX/2wBDAQwNDREPESESEiFFLicuRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCABQAFADASIAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAABAUGAQIDBwD/xAA3EAACAQIEBQEGBAUFAQAAAAABAgMEEQAFEiETMUFRYSIGFDJxgZEjQrHBFaHR4fAzUmJygvH/xAAaAQADAQEBAQAAAAAAAAAAAAADBAUCAAEG/8QALREAAgIBAwICCgMBAAAAAAAAAQIAAxEEEiExQVGRBRMUFSIzYYGhsSMycfD/2gAMAwEAAhEDEQA/APTsvoKbK6KKko4ligiFlUfqe584jMtRRW5orEWWum2vb8xP74vMQcA053nSdqxj91U/vhHX/J+8Pp/7xnZbelEv5a+M73/DRb9TgfCvOs1fLxwKcfjkbufyjx5xHppNpIEobCSAvWOZ2Snu76I1v8TsBjHpdVdfWGFwV3GIeHVVyWlYuB6mLNuxPU+OeGq1EhhSkWcLTIwsUJuxIG1+tv8AO4t+51KAq3P4k99Ua32kR7NPFB/quB/xtc/YYU5lnz00HFgoz6msOKbD7D+uMK8AieOS8bE6lR2HM35/598CBhIjIWBIU7H4eXU359eWGaPR1VYww3Rd9VYW44jPIaqur095qCFUH0oigXP9B5wXmsFLUUr0mZWMdStwxHwkXsb9DgfK56dMvig1kSIB8QNnJJueXzxjNxVSoqRRySKTYsBtY9Pp++AuqpeSy4x0x08P+/2MIGsTCnOesaz+0882eRUFNChjhqdFY4k9UYMmiP6sdyO2F7DR7UZ2veZG+8a45loh7VyVoziATvmKwNlfo9aA6AxHMuPiBxqtZFV+1+ecAkrHIkbE/wC5UAP8xjGuH8Bnaf5gjDCrPQJWpo+HqbmzW5L2v9D9sNHYRrqc2B2G174E9ocwghg9zpgSZCHMxaytYdPlblfnfCPo+shi7Dj9xx3O4KnX9SUOmlrmgUkli0jEG9h/YDBQDgst9KMQDdgGC8zt1PTbvglJ4C6mionnYi2uUCx+fcX746ulfO0cWhRULdmWNQNF+Wo8h8j9jj6Q6gAcDiTTpviyxx+4IlPK1OWf8N3cklCCbW5A3+9vGB55lRFghlWaRRo/DAARRe4P16nzigp8o0MXnmLkgjT8Vr/YfyxmXIqCXeQTNvcgSBQT5sN/rhX3jpw3xHnznvsr9hx5QDLaKorp6eWaHiRoRZnPDUAdEHM/P/7isnVWBsACNwQNjgaaldZiYN1Ybh2vv4wJBnUBMkdWTCYjYM35/wC+NaqhdQuT1EFTaUfGIZRZPTT+0lVV+5wGaObWJmUaidZ9Q2vyGnnzF8S2VvwfaH2olAJIrioA53Jxc5K0TZxm+grr4o1Bb7WuN/PM/XEHQh2z32lVC41Zg1+HzI3wvcAUwfpDJnPEYU7tDW1VZJIJFaMIkd9zZgbk99tsdko46iip0qHaOnWRi8SbufFzy74DCpTSgGTiMpusUQ1G/noMFUkzwxlKiim4ZbVrVrsP64FWuG8R4jwh2Z2G9BggTv8Aw1FlvRVkkUJuWQAEj/rexQnvv4wXFFHBEI4kCRjko/XyfOOMNg4dTqRtlJWxAPXHaSRYomdpEjsNmfkDyF8K682WWLUpyvbtCULsXe45m5BHMWvj51aOFpXRiirqsOv9sLylZOOHT1SorAaptJLFhzsDyxrT5B6vVW1bOd7ggE4XpqrrcG3yh2O5ODj8zesmra+NY6CSOCN19TC+onsD0wpjo6umZKSWITRM/qWxOnfc/vhsaCSkZWjmaQcTSDLJuD8uX2F8dI6szSsiktYEaiLbnbF8sjVm5D0HY5koOyMKWAIJ7jH3zKTKZL1+ZRamIjm21MTzudgRsN7bE4ka2kgT2jz+ONWRGeORtBtdygv+uK/3KaiXNqqN1Mk6l49N/SQptzNr37Y84izyQSu7sWaS2tn9Ra3e+/TC1x4Ajmloaw7h2jXiUmUNFE80ccsxARX+KUlgtgfF740pc3jnzuooDFKksCEyyP8AA3q9On/yRfzjQQQZ7JTzT2WSkl4iBd/8GwwfFSoXeaeKM1Drod1HxL0GCggjMYNbK2OgBnRpUZV0ENqYAEYMaMuhJjDJfqL4EISGLSgCjsMMI4ZHLEXUb798S/SG4FCp55m2x36QdmWOMk2VEFzbkBhHWZtNURmWkk92hiYAa/ikbt4GOWfZo0dVwUcmJTZlIKkHyDhVUtJIhWO5gvrYgeMe0adUbNnJM4KWr3LxDaGCszGrWZnkkm5qQfh8+MU9FTwFoTxHmnLniGUm62B2t0wDkVArwam4qBhdpI5SmjsBbnhtDTxxzhop5ZJADdpLNceTa+MahvVHaTiYa4W8AcSqx4xntKlFnFXFAbxLKyqe1juPpj1/L6+mzSiiq6OVZYJRdWH6HsfGIuDJYM8ps0Ep0SHMJ2jkA3U6iPttihe6ooLRXS2+rf6GSGX1z0k6ODyO47jriw96TTqB2O+E8fsRmfvaxvwhDfeUPcW+XPFX/CMsjOnhSG227HC3tVdfUyjZahx3MmsxzNI1C8y21vHfFVlkhnyemlJ3MYF/lt+2IbNMgrKStYxLJUwu3okAufkexxdUVMIMqpaYOC8SAML9euBah0s25PBMFqCvqwV6wLOMp/idAUjiiknLqFdvyC+5vz5YmBT1Kzy5b7syTsdC3B+D58jfvi/p4mjBLdemM1M0kKAxxGUk2sOmMnUlbCq4PgekVrcgAHyzEeXQVBgjo6gGOSFLWbkQOuFEGcyvWSUUUyGZELSfhkKpC6tNyNzboMUtRmMvDMfBZGYdRyxCZjDFS5lNnMsc1O3CRCoC2ZlTT8RUne3IWwSpa7HbeBzjvnmZc2KBzP/Z"
};

function renderNowPlaying() {
  const contenedor = document.getElementById("now-playing-root");

  if (!contenedor) {
    return;
  }

  const { titulo, enlace, imagen } = NOW_PLAYING;

  contenedor.innerHTML = `
    <section class="now-playing panel-lateral" aria-label="Juego actual">

      <a
        class="now-playing-imagen"
        href="${enlace}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="${imagen}"
          alt="${titulo}"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="now-playing-contenido">

        <div class="now-playing-encabezado">
          <i class="fa-solid fa-gamepad" aria-hidden="true"></i>
          <span>Now Playing:</span>
        </div>

        <a
          class="now-playing-juego"
          href="${enlace}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${titulo}
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>

      </div>

    </section>
  `;
}

renderNowPlaying();
