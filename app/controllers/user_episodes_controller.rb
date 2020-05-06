class UserEpisodesController < ApplicationController

    def show
        user = User.find(params[:id])
        user_episodes=user.user_episodes
        render json: user_episodes.to_json(:include => [:episode])
    end

    def create
        # {
        #     "user_id": 1,
        #     "episdoe_id": 5,
        # }
        user_episode=UserEpisode.create(user_id: params["user_id"].to_i, episode_id: params["episode_id"].to_i)
      
        render json: user_episode
      end

      def destroy
        user_ep = UserEpisode.find(params[:id])
        user_ep.destroy
      end

      def user_params
        params.require(:user_id, :episode_id)
      end
end
