class UserShowsController < ApplicationController

    def show
        user = User.find(params[:id])
        user_shows=user.user_shows
        render json: user_shows.to_json(:include => [:show], :except => [:updated_at])
      end

      def create
        # {
        #     "user_id": 1,
        #     "api_id": 5,
        #     "title": "Under the Dome"
        # }
        
        sentshow= Show.find_by(api_id: params["api_id"].to_i)
        user=User.find(params["user_id"].to_i)
        
        if sentshow
          if user.shows.include?(sentshow)
            user_show=UserShow.find_by(user_id: params["user_id"].to_i, show_id: sentshow.id)
          else 
            user_show=UserShow.create(user_id: params["user_id"].to_i, show_id: sentshow.id)
          end
        else 
           newshow= Show.create(title: params["title"], api_id: params["api_id"].to_i)
           user_show=UserShow.create(user_id: params["user_id"].to_i ,show_id: newshow.id)
        end
        render json: user_show
      end

      def destroy
        user_show = UserShow.find(params[:id])
        user_show.destroy
      end

      def user_params
        params.require(:user_id, :api_id, :title)
      end
end
