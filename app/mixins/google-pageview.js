import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Mixin.create({
  beforePageviewToGA(/*ga*/) {},
  pageviewToGA: Ember.on('didTransition', function(page, title) {
    page = page ? page : this.get('url');
    title = title ? title : this.get('url');

    if (Ember.get(ENV, 'googleAnalytics.webPropertyId') != null) {
      let trackerType = Ember.getWithDefault(ENV, 'googleAnalytics.tracker', 'analytics.js');

      if (trackerType === 'analytics.js') {
        let globalVariable = Ember.getWithDefault(ENV, 'googleAnalytics.globalVariable', 'ga');

        this.beforePageviewToGA(window[globalVariable]);

        window[globalVariable]('send', 'pageview', {
          page: page,
          title: title
        });
      } else if (trackerType === 'ga.js') {
        window._gaq.push(['_trackPageview']);
      }
    }
  })
});
