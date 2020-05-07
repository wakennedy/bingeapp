class CreateUserEpisodes < ActiveRecord::Migration[6.0]
  def change
    create_table :user_episodes do |t|
      t.integer :episode_id
      t.integer :user_id
      t.integer :runtime

      t.timestamps
    end
  end
end
