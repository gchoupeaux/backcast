var AppView = Backbone.View.extend({
  
  el: '#app',

  // initialize: function(data) {
  //   this.videos = new Videos(data);
  //   // this.videos.fetch('barbeque');
  //   // this.render();

  // },


  initialize: function() {
    this.videos = new Videos();

    this.listenTo(this.videos, 'sync', this.selectFirst);
    this.videos.search('javascript tutorial');
    this.render();
  },


  selectFirst: function() {
    if (this.videos.length > 0) {
      this.videos.at(0).select();
    }
  },




  render: function() {
    
    this.$el.html(this.template());

    // render videoListView
    new VideoListView({
      collection: this.videos, // Pass the data from exampleVideoData into the VideoListView
      el: this.$('.list')
    }).render();
    
    // VideoPlayerView
    new VideoPlayerView({
      model: this.videos.at(0), 
      collection: this.videos,
      el: this.$('.player')
    }).render();

    // SearchView
    new SearchView({
      collection: this.videos,
      el: this.$('.search')
    }).render();

    return this;
  },

  template: templateURL('src/templates/app.html')

});
