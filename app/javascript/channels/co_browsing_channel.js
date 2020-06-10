import consumer from "./consumer"
window.recordings = [];
window.player = null;
window.record = false;
window.replay = false
function livePlay(data) {
  if (window.player === null && window.replay && window.recordings.length >= 2) {
    window.player = new rrweb.Replayer(window.recordings, {
      liveMode: true,
      unpackFn: rrweb.unpack,
    });
    if(window.replay) {
      window.player.play();
    }

  } else {
    window.recordings.push(data);
  }

  if (window.player !== null) {
    window.player.addEvent(data);
  }
};

window.App = {};
window.App.server = consumer.subscriptions.create("CoBrowsingChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('connected')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {

      // if(count == 0) {
      //   console.log("count", count)
      //   const myNode = document.body;
      //   myNode.innerHTML = '';
      //   count+=1;
      // }
      console.log("received broadcast back data")

      console.log(data)
      if(window.replay) {
        livePlay(data);
      }




  }
});
window.stopFn = null;

function recordfn() {
  window.record = true;
  window.replay = false;
  window.stopFn = rrweb.record({
    emit(event) {
      console.log('making event')
      window.App.server.send(event)
    },
  });
  if (window.player!=null) {
    window.player.pause
  }

}

function replayfn() {
  window.record = false;
  window.replay = true
  if(window.stopFn) {
    window.stopFn();
  }
  window.replay = true;
}
window.recordfn = recordfn
window.replayfn = replayfn
