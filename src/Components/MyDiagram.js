import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import DiagramButtons from './DiagramButtons';
import './MyDiagram.css';
import { getRandomColor } from '../Helpers/ColorHelper';
import SelectionDetails from './SelectionDetails';

class MyDiagram extends React.Component {
    nodeId = 0;

    constructor(props) {
        super(props);

        this.createDiagram = this.createDiagram.bind(this);
        this.modelChangeHandler = this.modelChangeHandler.bind(this);
        this.initModelHandler = this.initModelHandler.bind(this);
        this.updateColorHandler = this.updateColorHandler.bind(this);
        this.nodeSelectionHandler = this.nodeSelectionHandler.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.removeLink = this.removeLink.bind(this);
        this.addNode = this.addNode.bind(this);
        this.updateNodeText = this.updateNodeText.bind(this);
        this.onTextEdited = this.onTextEdited.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
        this.onUpdateText = this.onUpdateText.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.state = {
            LastName:'',
            FirstName:'',
            Gender:'',
            DOB:'',

            selectedNodeKeys: [],
            model: {
                nodeDataArray: [{ key: '0', label: 'Me', color: 'lightblue' }],
                linkDataArray: []
            }
        };
    }

    HandleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        })
        //this.setState({LastName: event.target.value});
    }

    HandleSubmit(event){
        event.preventDefault();
    }


    render() {
        return [


            <DiagramButtons
                key="diagramButtons"
                onInit={this.initModelHandler}
                onUpdateColor={this.updateColorHandler}
                onAddNode={this.addNode}
                onHandleChange = {this.HandleChange}
                onHandleSubmit = {this.HandleSubmit}
                onUpdateText={this.onUpdateText}
                //onUpdateNodeText={this.updateNodeText}

            />,

            <SelectionDetails key="selectionDetails" selectedNodes={this.state.selectedNodeKeys}  />,



            <GojsDiagram
                key="gojsDiagram"
                diagramId="myDiagramDiv"
                model={this.state.model}
                createDiagram={this.createDiagram}
                className="myDiagram"
                onModelChange={this.modelChangeHandler}
            />


        ];
    }

    getLargestNodeId(){
        var number = 0;
        var i;
        for (i = 0; i < this.state.model.nodeDataArray.length; i++) {
            number = i;
        }
        return number;
    }

    initModelHandler() {
        this.setState({
            ...this.state,
            model: {
                nodeDataArray: [
                    { key: '0', label: 'Me', color: 'lightblue' },
                    { key: '1', label: 'Mother', color: 'orange' },
                    { key: '2', label: 'Father', color: 'orange' },
                    { key: '3', label: 'Grandmother', color: 'lightgreen' },
                    { key: '4', label: 'Grandfather', color: 'lightgreen' },
                    { key: '5', label: 'Grandmother', color: 'lightgreen' },
                    { key: '6', label: 'Grandfather', color: 'lightgreen' },

                ],
                linkDataArray: [
                    { from: '0', to: '1' },
                    { from: '0', to: '2' },
                    { from: '1', to: '3' },
                    { from: '1', to: '4' },
                    { from: '2', to: '5'},
                    { from: '2', to: '6'},


                ]
            }
        });
    }
    getSelectedNodes(){
        var selectedNodes = this.state.selectedNodeKeys;
        var message ;//selectedNodes.reduce((result, current) => result + ' ' + current, '');
        var i ;
        for(i=0;i<selectedNodes.length;i++)
        {
            message = message + " "+selectedNodes[i];
        }
        console.log(message);
        return selectedNodes;
    }
    isOneSelected(){
        var selectedNodes = this.state.selectedNodeKeys;
        if(selectedNodes.length===1)
        {
            return true;
        }
        else
            return false;
    }


    getNumberParents(selectednodeId){
        var links = this.state.model.linkDataArray;
        var i;
        var numLinks=0;
        var selectedNode = this.getNodewithId(selectednodeId);
        if(selectedNode !== -1)
        {

            for (i = 0; i < links.length; i++) {
                if(parseInt(links[i]['from'])==selectednodeId){
                    numLinks++;
                }
            }
        }
        console.log("selectedNodeId: "+ selectednodeId+ " has numLinks: " + numLinks);
        return numLinks;
    }
    getNodewithId(givenNodeId){
        var i;
        for (i = 0; i <= this.state.model.nodeDataArray.length; i++) {
            if(i == givenNodeId)
            {
                console.log("givenNodeId: "+givenNodeId+ " node found")
                return this.state.model.nodeDataArray[i];
            }
        }
        console.log("givenNodeId: "+givenNodeId+ " node not found")
        return -1;
    }

    updateColorHandler() {
        const updatedNodes = this.state.model.nodeDataArray.map(node => {
            return {
                ...node,
                color: getRandomColor()
            };
        });

        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: updatedNodes
            }
        });
    }
    onUpdateText(e) {


        if (this.isOneSelected()) {
            var selectedNode = this.getSelectedNodes();
            const txtName = this.state.FirstName + ' ' + this.state.LastName;



                console.log("nodeSelected is " + selectedNode)
                this.updateNodeText(selectedNode, txtName);

        }
    }
            // const updatedNodes = this.state.model.nodeDataArray.map(node => {
            //     if(this.getSelectedNodes()==node){
            //         return {
            //             ...node,
            //             label: txtName
            //         };
            //     }
            //     return {
            //         ...node,
            //         color: getRandomColor()
            //     };
            // });
            // this.setState({
            //     ...this.state,
            //     model: {
            //         ...this.state.model,
            //         nodeDataArray: updatedNodes
            //     }
            // });



    createDiagram(diagramId: string) {
        const $ = go.GraphObject.make;
        const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.LeftCenter,
            layout: $(go.TreeLayout, {
                angle: 0,
                arrangement: go.TreeLayout.ArrangementVertical,
                treeStyle: go.TreeLayout.StyleLayered
            }),
            isReadOnly: false,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            allowZoom: false,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.LeftCenter,
            TextEdited: this.onTextEdited
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        // myDiagram.nodeTemplate =
        //     $(go.Node, "Auto",
        //         new go.Binding("location", "loc", go.Point.parse),
        //         {
        //                      selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected)
        //               },
        //         $(go.Shape, "Ellipse",
        //             { fill: 'green', portId: "", cursor: "pointer",
        //                 },  // at most TWO links can come into this node
        //             new go.Binding("fromLinkable", "from"),
        //             new go.Binding("toLinkable", "to")),
        //         $(go.TextBlock, { margin: 8, editable: false }, new go.Binding('text', 'label'))
        //     );
        myDiagram.nodeTemplate = $(
            go.Node,
            'Auto',
            {
                selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected)
            },
            $(go.Shape, 'RoundedRectangle',
                { strokeWidth: 0 ,
                  toMaxLinks: 2 ,
                    fromMaxLinks:2}, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8, editable: true }, new go.Binding('text', 'label'))
        );
        myDiagram.layout = $(go.TreeLayout, {angle: 270, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform });

        return myDiagram;
    }

    modelChangeHandler(event) {
        switch (event.eventType) {
            case ModelChangeEventType.Remove:
                if (event.nodeData) {
                    this.removeNode(event.nodeData.key);
                }
                if (event.linkData) {
                    this.removeLink(event.linkData);
                }
                break;
            default:
                break;
        }
    }


    addNode() {
        if(this.isOneSelected())
        {
         console.log("selected nodes in add node is "+this.getSelectedNodes().toString());
         const numParents = this.getNumberParents(this.getSelectedNodes().toString());
         console.log("number of parents: "+numParents);
         if(numParents<2)
         {
             const newNodeId = this.getLargestNodeId()+1;
             const linksToAdd = this.state.selectedNodeKeys.map(parent => {
                 return { from: parent, to: newNodeId };
             });
             const txtName = this.state.FirstName +' '+ this.state.LastName;
             this.setState({
                 ...this.state,
                 model: {
                     ...this.state.model,
                     nodeDataArray: [
                         ...this.state.model.nodeDataArray,
                         //{ key: newNodeId, label: newNodeId, color: getRandomColor() }
                         { key: newNodeId, label: txtName, color: getRandomColor() }
                     ],
                     linkDataArray:
                         linksToAdd.length > 0
                             ? [...this.state.model.linkDataArray].concat(linksToAdd)
                             : [...this.state.model.linkDataArray]
                 }
             });
             this.nodeId += 1;

         }
        }



    }

    removeNode(nodeKey) {
        const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                    ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
                ]
            }
        });
    }

    removeLink(linKToRemove) {
        const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        return {
            ...this.state,
            model: {
                ...this.state.model,
                linkDataArray: [
                    ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
                    ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1)
                ]
            }
        };
    }

    updateNodeText(nodeKey, text) {
        const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(node => node.key == nodeKey);
        if (nodeToUpdateIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToUpdateIndex),
                    {
                        ...this.state.model.nodeDataArray[nodeToUpdateIndex],
                        label: text
                    },
                    ...this.state.model.nodeDataArray.slice(nodeToUpdateIndex + 1)
                ]
            }
        });
    }

    nodeSelectionHandler(nodeKey, isSelected) {
        if (isSelected) {
            this.setState({
                ...this.state,
                selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
            });
        } else {
            const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
            if (nodeIndexToRemove === -1) {
                return;
            }
            this.setState({
                ...this.state,
                selectedNodeKeys: [
                    ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
                    ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
                ]
            });
        }
        this.getNumberParents(this.getSelectedNodes());

    }

    onTextEdited(e){
        const tb = e.subject;
        if (tb === null) {
            return;
        }
        const txtName = this.state.FirstName +' '+ this.state.LastName;

        const node = tb.part;
        if (node instanceof go.Node) {
            this.updateNodeText(node.key, txtName);
        }
    }
}

export default MyDiagram;