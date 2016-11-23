namespace :dashboard do
  desc "TODO"
  task get_data: :environment do
      url = "http://localhost:9000/api/malaria_dashboard"
      json_data = RestClient.get(url) rescue ""
  end
end
