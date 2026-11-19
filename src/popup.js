const ALMA_URL = 'https://apps.inditex.com/almafeshll/web';
const enabledEl = document.getElementById('enabled');
const localeEl = document.getElementById('locale');
const statusEl = document.getElementById('status');
const currentEl = document.getElementById('current');

chrome.storage.sync.get({ locale: 'ko-KR', enabled: true }, s => {
  enabledEl.checked = s.enabled;
  localeEl.value = s.locale;
});

chrome.cookies.getAll({ url: ALMA_URL, name: 'locale' }, cookies => {
  currentEl.textContent = cookies.length
    ? '현재 locale 쿠키: ' + cookies.map(c => c.value + ' (' + c.domain + c.path + ')').join(', ')
    : 'locale 쿠키가 없습니다. ALMA에 로그인한 뒤 다시 열어 주세요.';
});

document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set(
    { locale: localeEl.value.trim(), enabled: enabledEl.checked },
    () => {
      statusEl.textContent = '저장됨 - ALMA 탭을 새로고침하면 적용됩니다';
      setTimeout(() => { statusEl.textContent = ''; }, 2000);
    }
  );
});
