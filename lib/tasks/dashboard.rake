namespace :dashboard do
  desc "TODO"
  task get_data: :environment do
   # Site.by_name.all.each do |site|
     # puts "Querying data for site: #{site.name}"
      #url = "#{site.ip_address}/api/malaria_dashboard"
      url = "http://localhost:9000/api/malaria_dashboard"
      json_data = RestClient.get(url) rescue "" #, {site_id: site.id,
                                       #site_code: site.site_code,
                                       #name: site.name,
                                      # district: site.district,
                                      # ip_address: site.ip_address
      #}) rescue ""
=begin
      PullTracker.create(
          site_id: site.id,
          status: (json_data.blank? ? "Fail" : "Success"),
          date: Date.today,
          data: json_data
      )
=end
      #PullTracker.add_site(site.id, (json_data.blank? ? 'Fail' : 'Success'), Date.today, json_data)

      #system "curl -H \"Content-type:application/json\" -d \"#{json_data}\" -X POST #{url} "
    #end

	  #replicator
      #curl -X POST  http://127.0.0.1:5984/_replicate -d '{
   # "source":"http://admin:v1nt4ge.@localhost:5984/malaria_dashboard_site_data_development",
   # "target":"http://admin:v1nt4ge.@localhost:5984/malaria_dashboard_data_development",
   # "continuous":false}' -H "Content-Type: application/json"

  end
end
