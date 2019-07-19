# require 'json'
#
# class GraphListener
#   attr_accessor :listener
#
#   def initialize
#     self.listener = Listen.to(Rails.root.join('tmp', 'import', 'graphs')) do |modified, added, removed|
#       handle_added added
#     end
#   end
#
#   def start
#     puts "Start graph listener"
#     self.listener.start
#   end
#
#   def stop
#     self.listener.stop
#   end
#
#   private
#
#   def handle_added(file_paths)
#     return if file_paths.empty?
#     puts "added absolute path: #{file_paths}"
#     file_paths.each do |path|
#       graph = JSON.parse(File.read(path))
#       Graph.create(graph)
#
#       File.delete(path) if File.exist?(path)
#     end
#   end
# end
