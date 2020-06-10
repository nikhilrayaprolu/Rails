class CoBrowsingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "co_browsing"
  end
  def receive(data)
    ActionCable.server.broadcast "co_browsing", data
  end
  def send_events(data)
    ActionCable.server.broadcast "co_browsing", data
  end
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
