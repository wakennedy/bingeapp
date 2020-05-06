class Show < ApplicationRecord
    has_many :episodes
    has_many :user_shows
    has_many :users, through: :user_shows

    def populate
        res = RestClient.get("http://api.tvmaze.com/shows/#{self.api_id}/episodes")
        episodes = JSON.parse(res.body)
            #make episodes
        episodes.each do |episode|
           Episode.create(show_id: self.id, season: episode["season"], number: episode["number"], name:episode["name"], api_id:episode["id"], image_url: episode["image"]["medium"])
        end
    end
end

    # EPISODE RESPONSE SAMPLE

#     [{"id"=>100,
#   "url"=>"http://www.tvmaze.com/episodes/100/bitten-1x01-summons",
#   "name"=>"Summons",
#   "season"=>1,
#   "number"=>1,
#   "airdate"=>"2014-01-11",
#   "airtime"=>"21:00",
#   "airstamp"=>"2014-01-12T01:00:00+00:00",
#   "runtime"=>60,
#   "image"=>
#    {"medium"=>
#      "http://static.tvmaze.com/uploads/images/medium_landscape/0/34.jpg",
#     "original"=>
#      "http://static.tvmaze.com/uploads/images/original_untouched/0/34.jpg"},
#   "summary"=>
#    "<p>After the mauled body of a girl shows up on the outskirts of Bear Valley in Upstate New York, Elena Michaels, the world's only female werewolf, is forced to choose between her new \"human\" life in Toronto with new love, Philip and her previous life with The Pack, at Stonehaven. Even though it's been a year since she abandoned her life among the werewolves, Elena still feels the sting of having forsaken her old world, while trying to build a new and \"normal\" life.</p>",
#   "_links"=>{"self"=>{"href"=>"http://api.tvmaze.com/episodes/100"}}},
#  {"id"=>101,
#   "url"=>"http://www.tvmaze.com/episodes/101/bitten-1x02-prodigal",
#   "name"=>"Prodigal",
#   "season"=>1,
#   "number"=>2,
#   "airdate"=>"2014-01-18",
#   "airtime"=>"21:00",
#   "airstamp"=>"2014-01-19T01:00:00+00:00",
#   "runtime"=>60,
#   "image"=>
#    {"medium"=>
#      "http://static.tvmaze.com/uploads/images/medium_landscape/0/33.jpg",
#     "original"=>
#      "http://static.tvmaze.com/uploads/images/original_untouched/0/33.jpg"},
#   "summary"=>
#    "<p>At Stonehaven, Elena tracks the killer Mutt, while avoiding the advances of Clay Danvers, her former lover. Haunted by her own past as a killer, Elena is desperate to get back to her human life, but is delayed when a second body is discovered, this time on Stonehaven property.</p>",
#   "_links"=>{"self"=>{"href"=>"http://api.tvmaze.com/episodes/101"}}},