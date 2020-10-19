export default (response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link =  document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Отчет.xls');
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
}