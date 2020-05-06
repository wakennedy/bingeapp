class CreateEpisodes < ActiveRecord::Migration[6.0]
  def change
    create_table :episodes do |t|
      t.integer :show_id
      t.integer :season
      t.integer :number
      t.string :name
      t.integer :api_id
      t.string :image_url
      t.timestamps
    end
  end
end
