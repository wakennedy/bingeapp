class UserEpisodesController < ApplicationController

    def show
        user = User.find(params[:id])
        user_episodes=user.user_episodes
        render json: user_episodes.to_json
    end

    def create
        if params["episode_list"]==nil
            # {
        #     "user_id": 1,
        #     "episdoe_id": 5,
        #     "runtime":1
        # }
          found_user_ep=UserEpisode.find_by(user_id: params["user_id"].to_i, episode_id: params["episode_id"].to_i)
          if !found_user_ep
          user_episode=UserEpisode.create(user_id: params["user_id"].to_i, episode_id: params["episode_id"].to_i, runtime: params["runtime"].to_i)
          else 
            user_episode=found_user_ep
          end
          render json: user_episode
        else
               # {
        #     "user_id": 1,
        #     "episode_list": []
        # }
          params["episode_list"].each do |ep|
            found_user_ep=UserEpisode.find_by(user_id: params["user_id"].to_i, episode_id: ep["id"].to_i)
            UserEpisode.create(user_id: params["user_id"].to_i, episode_id: ep["id"].to_i, runtime: ep["runtime"].to_i) if !found_user_ep
          end
        end
      end

      def destroy
        user_ep = UserEpisode.find(params[:id])
        user_ep.destroy
      end

      def user_params
        params.require(:user_id, :episode_id, :runtime_list, :episode_list)
      end
end
