class PullTracker < ActiveRecord::Migration
  def change
    create_table :pull_trackers do |t|
      t.string :site_id
      t.string :date
      t.text :data, :limit => 4294967295
      t.string :status
      t.timestamps
    end
 
  end
end
