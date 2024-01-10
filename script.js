function displayFile() {
    const tahunAngkatan = document.getElementById('tahunAngkatan').value;
    const npm = document.getElementById('npm').value;
    const downloadType = document.getElementById('downloadType').value;

    let fileUrl;

    if (downloadType === 'image') {
        fileUrl = `https://simak.unsil.ac.id/us-unsil/foto/${tahunAngkatan}/${npm}.jpg`;
        document.getElementById('fileContainer').innerHTML = `<img src="${fileUrl}" alt="Student Image">`;
    } else if (downloadType === 'pdf') {
        fileUrl = `https://simak.unsil.ac.id/us-unsil/baa/transkripmhsw.php?gos=_CetakTranskrip&MhswID=${npm}&_rnd=0eiHPyOK&jen=2`;
        document.getElementById('fileContainer').innerHTML = `<embed src="${fileUrl}" type="application/pdf" width="100%" height="500px" />`;
    } else {
        console.error('Invalid download type selected');
        return;
    }
}
