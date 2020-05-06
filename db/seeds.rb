# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

<<<<<<< HEAD
u1= User.create(username: "Sara", location: "Seattle", score: 0)
u2= User.create(username: "Gabriel", location: "Seattle", score: 0)
u3= User.create(username: "Aman", location: "Seattle", score: 0)
=======
 u1= User.create(username: "Sara", location: "Seattle", score: 0)
# u2= User.create(username: "Gabriel", location: "Seattle", score: 0)
# u3= User.create(username: "Aman", location: "Seattle", score: 0)
>>>>>>> baa53c8f0dd76f7e35774016caf45295060dceea
u4= User.create(username: "Will", location: "Seattle", score: 0)

res = RestClient.get("http://api.tvmaze.com/shows/526")
show = JSON.parse(res.body)


# {"id"=>526,
#  "url"=>"http://www.tvmaze.com/shows/526/the-office",
#  "name"=>"The Office",
#  "type"=>"Scripted",
#  "language"=>"English",
#  "genres"=>["Comedy"],
#  "status"=>"Ended",
#  "runtime"=>30,
#  "premiered"=>"2005-03-24",
#  "officialSite"=>"http://www.nbc.com/the-office",
#  "schedule"=>{"time"=>"21:00", "days"=>["Thursday"]},
#  "rating"=>{"average"=>8.5},
#  "weight"=>97,
#  "network"=>
#   {"id"=>1,
#    "name"=>"NBC",
#    "country"=>
#     {"name"=>"United States", "code"=>"US", "timezone"=>"America/New_York"}},
#  "webChannel"=>nil,
#  "externals"=>{"tvrage"=>6061, "thetvdb"=>73244, "imdb"=>"tt0386676"},
#  "image"=>
#   {"medium"=>
#     "http://static.tvmaze.com/uploads/images/medium_portrait/85/213184.jpg",
#    "original"=>
#     "http://static.tvmaze.com/uploads/images/original_untouched/85/213184.jpg"},
#  "summary"=>
#   "<p>Steve Carell stars in <b>The Office</b>, a fresh and funny mockumentary-style glimpse into the daily interactions of the eccentric workers at the Dunder Mifflin paper supply company. Based on the smash-hit British series of the same name and adapted for American Television by Greg Daniels, this fast-paced comedy parodies contemporary American water-cooler culture. Earnest but clueless regional manager Michael Scott believes himself to be an exceptional boss and mentor, but actually receives more eye-rolls than respect from his oddball staff.</p>",
#  "updated"=>1583654209,
#  "_links"=>
#   {"self"=>{"href"=>"http://api.tvmaze.com/shows/526"},
#    "previousepisode"=>{"href"=>"http://api.tvmaze.com/episodes/711203"}}}
# {"id"=>526, "url"=>"http://www.tvmaze.com/shows/526/the-office", "name"=>"The Office", "type"=>"Scripted", "language"=>"English", "genres"=>["Comedy"], "status"=>"Ended", "runtime"=>30, "premiered"=>"2005-03-24", "officialSite"=>"http://www.nbc.com/the-office", "schedule"=>{"time"=>"21:00", "days"=>["Thursday"]}, "rating"=>{"average"=>8.5}, "weight"=>97, "network"=>{"id"=>1, "name"=>"NBC", "country"=>{"name"=>"United States", "code"=>"US", "timezone"=>"America/New_York"}}, "webChannel"=>nil, "externals"=>{"tvrage"=>6061, "thetvdb"=>73244, "imdb"=>"tt0386676"}, "image"=>{"medium"=>"http://static.tvmaze.com/uploads/images/medium_portrait/85/213184.jpg", "original"=>"http://static.tvmaze.com/uploads/images/original_untouched/85/213184.jpg"}, "summary"=>"<p>Steve Carell stars in <b>The Office</b>, a fresh and funny mockumentary-style glimpse into the daily interactions of the eccentric workers at the Dunder Mifflin paper supply company. Based on the smash-hit British series of the same name and adapted for American Television by Greg Daniels, this fast-paced comedy parodies contemporary American water-cooler culture. Earnest but clueless regional manager Michael Scott believes himself to be an exceptional boss and mentor, but actually receives more eye-rolls than respect from his oddball staff.</p>", "updated"=>1583654209, "_links"=>{"self"=>{"href"=>"http://api.tvmaze.com/shows/526"}, "previousepisode"=>{"href"=>"http://api.tvmaze.com/episodes/711203"}}}