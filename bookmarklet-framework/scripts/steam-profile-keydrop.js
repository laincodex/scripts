const mode = confirm('Set to keydrop?');
let name, avatar;
if (mode ) {
  name = 'Lain KeyDrop.com';
  avatar = 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/59/5939d0c8e6ab9b7e9a1008a0063321363cd091b8_full.jpg';
} else {
  name = 'Lain';
  avatar = 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/bb/bb6311aea68aa8c3ebb42a21756c302505d768dd_full.jpg';
}
toggleLoading(true);
setLoadingMessage('Changing name...');
try {
  const appRootEl = document.getElementById('application_root');
  const formEl = document.getElementsByTagName('form')[0];
  const inputs = formEl.getElementsByTagName('input');
  const personaName = inputs.personaName;
  personaName.value = name;
  formEl.getElementsBySelector('button[type=submit]')[0].click();
  await wait(200);
  setLoadingMessage('Changing Avatar...');
  appRootEl.getElementsBySelector('a[href=/id/PsychoRabb1t/edit/avatar]')[0].click();
  const avatarImg = await waitForSelector('img[src='+avatar+']');
  avatarImg[0].parentElement.click();
  await wait(200);
  appRootEl.getElementsBySelector('button.Primary')[0].click();
  await wait(200);
  document.location.href = '/id/PsychoRabb1t/edit/info';
} catch (err) {
  toggleLoading(false);
  setContent(err.message);
}