define(['text!/js/config.json'], function(config) {
  try {
    window.config = JSON.parse(config);
    console.debug("Wrote window.config:",window.config);
  } catch (e) {
    console.error("Building config failed:",e);
  }
});