class RestGraph < Graph
  validate :nodes_have_only_rest_inputs

  def nodes_have_only_rest_inputs
    self.nodes.each do |node|
      if node.content['type'] == 'input' && node.content['sub_type'] != 'rest'
        errors.add(:nodes, "RestGraph nodes content needs to be type of 'rest'")
      end
    end
  end
end
