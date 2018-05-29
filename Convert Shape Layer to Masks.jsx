if (app.project.activeItem.selectedLayers[0] != null)
{
    for (var layerNum = 0; layerNum < app.project.activeItem.selectedLayers.length; layerNum++)
    {
        var layer = app.project.activeItem.selectedLayers[layerNum];
        if (app.project.activeItem.selectedLayers[layerNum].matchName == 'ADBE Vector Layer')
        {
            var contents = layer.property("Contents");
            var count = 1;
            while (contents.property("Group " + count) != null)
            {
                count++;
            }
            count--;
            
            var newLayer = app.project.activeItem.layers.addShape();
            newLayer.name = layer.name + " Masks";

            for (var i = 1; i <= count; i++)
            {
                var pathCount = 1;
                 var newMask = newLayer.Masks.addProperty("Mask");
                 var property = newMask.maskPath;
                 var shape = property.value;
                 var vertices = layer.content("Group " + i).content("Path " + pathCount).path.value.vertices;
                 
                 for (var j = 0; j < layer.content("Group " + i).content("Path " + pathCount).path.value.vertices.length; j++)
                 {
                        vertices[j] = [vertices[j][0] + layer.content("Group " + i).transform.position.value[0] - layer.transform.anchorPoint.value[0], vertices[j][1] + layer.content("Group " + i).transform.position.value[1] - layer.transform.anchorPoint.value[1]];                            
                 }
                 shape.vertices = vertices;
                 shape.inTangents = layer.content("Group " + i).content("Path " + pathCount).path.value.inTangents;
                 shape.outTangents = layer.content("Group " + i).content("Path " + pathCount).path.value.outTangents;
                 shape.closed = layer.content("Group " + i).content("Path " + pathCount).path.value.closed;
                property.setValue(shape);
            }        
        }
        else
        {
            alert("Please select a shape layer.", "Error");
        }
    }
}
else
{
    alert("No layer selected!", "Error");
}