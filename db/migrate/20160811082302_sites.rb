class Sites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string :name
      t.string :site_code
      t.string :ip_address
      t.string :district 
      t.timestamps
    end
  end
end
