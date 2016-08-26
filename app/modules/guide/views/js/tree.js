window.ReactWebComponent = $.extend(window.ReactWebComponent, (function () {

    'use strict';

    var Tree = React.createClass({
        displayName: 'Tree',

        propTypes: {
            levels: React.PropTypes.number,

            expandIcon: React.PropTypes.string,
            collapseIcon: React.PropTypes.string,
            emptyIcon: React.PropTypes.string,
            nodeIcon: React.PropTypes.string,

            color: React.PropTypes.string,
            backColor: React.PropTypes.string,
            borderColor: React.PropTypes.string,
            onhoverColor: React.PropTypes.string,
            selectedColor: React.PropTypes.string,
            selectedBackColor: React.PropTypes.string,

            enableLinks: React.PropTypes.bool,
            highlightSelected: React.PropTypes.bool,
            showBorder: React.PropTypes.bool,
            showTags: React.PropTypes.bool,

            children: React.PropTypes.arrayOf(React.PropTypes.number)
        },

        getDefaultProps: function getDefaultProps() {
            return {
                levels: 2,

                expandIcon: 'glyphicon glyphicon-plus',
                collapseIcon: 'glyphicon glyphicon-minus',
                emptyIcon: 'glyphicon',
                nodeIcon: 'glyphicon glyphicon-stop',

                color: undefined,
                backColor: undefined,
                borderColor: undefined,
                onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
                selectedColor: '#FFFFFF',
                selectedBackColor: '#428bca',

                enableLinks: false,
                highlightSelected: true,
                showBorder: true,
                showTags: false,

                serialNumber: false,

                children: []
            };
        },

        setNodeId: function setNodeId(node) {

            if (!node.nodes) return;

            var _this = this;
            node.nodes.forEach(function checkStates(node) {
                node.nodeId = _this.props.nodes.length;
                _this.props.nodes.push(node);
                _this.setNodeId(node);
            });
        },

        render: function render() {

            var data = this.props.data;

            this.setNodeId({ children: data });

            var children = [];
            if (data) {
                var _this = this;
                data.forEach(function (node, index) {
                    children.push(React.createElement(TreeNode, { key: index,
                        index: index,
                        serial: 0,
                        serialNumber: _this.props.serialNumber,
                        node: node,
                        level: 1,
                        visible: true,
                        options: _this.props }));
                });
            }

            return React.createElement(
                'div',
                { id: 'treeview', className: 'treeview' },
                React.createElement(
                    'ul',
                    { className: 'list-group' },
                    children
                )
            );
        }
    });

    var TreeNode = React.createClass({
        displayName: 'TreeNode',

        getInitialState: function getInitialState() {
            var node = this.props.node;
            return {
                expanded: node.state && node.state.hasOwnProperty('expanded') ? node.state.expanded : this.props.level < this.props.options.levels ? true : false,
                selected: node.state && node.state.hasOwnProperty('selected') ? node.state.selected : false
            };
        },

        toggleExpanded: function toggleExpanded(id, event) {
            this.setState({ expanded: !this.state.expanded });
            event.stopPropagation();
        },

        toggleSelected: function toggleSelected(id, event) {
            this.setState({ selected: !this.state.selected });
            event.stopPropagation();
        },

        render: function render() {

            var node = this.props.node;
            var options = this.props.options;

            var style;
            if (!this.props.visible) {

                style = {
                    display: 'none'
                };
            } else {

                if (options.highlightSelected && this.state.selected) {
                    style = {
                        color: options.selectedColor,
                        backgroundColor: options.selectedBackColor
                    };
                } else {
                    style = {
                        color: node.color || options.color,
                        backgroundColor: node.backColor || options.backColor
                    };
                }

                if (!options.showBorder) {
                    style.border = 'none';
                } else if (options.borderColor) {
                    style.border = '1px solid ' + options.borderColor;
                }
            }

            var indents = [];
            for (var i = 0; i < this.props.level - 1; i++) {
                indents.push(React.createElement('span', { key: i, className: 'indent' }));
            }

            var expandCollapseIcon;
            if (node.nodes) {
                if (!this.state.expanded) {
                    expandCollapseIcon = React.createElement('span', { className: options.expandIcon,
                        onClick: this.toggleExpanded.bind(this, node.nodeId) });
                } else {
                    expandCollapseIcon = React.createElement('span', { className: options.collapseIcon,
                        onClick: this.toggleExpanded.bind(this, node.nodeId) });
                }
            } else {
                expandCollapseIcon = React.createElement('span', { className: options.emptyIcon });
            }

            var nodeIcon = React.createElement(
                'span',
                { className: 'icon' },
                React.createElement('i', { className: node.icon || options.nodeIcon })
            );

            var serial = "";
            var serialText = null;
            if (this.props.serialNumber) {
                if (this.props.level == 1) {
                    serial = [this.props.index + 1].join(".");
                    serialText = React.createElement(
                        'span',
                        null,
                        serial + ' '
                    );
                } else {
                    serial = [this.props.serial, this.props.index + 1].join(".");
                    serialText = React.createElement(
                        'span',
                        null,
                        serial + ' '
                    );
                }
            }

            var nodeText;
            if (options.enableLinks) {
                nodeText = React.createElement(
                    'a',
                    {href:"#"+serial},
                    node.name
                );
            } else {
                nodeText = React.createElement(
                    'span',
                    node.attr,
                    node.name
                );
            }

            var badges;
            if (options.showTags && node.tags) {
                badges = node.tags.map(function (tag) {
                    return React.createElement(
                        'span',
                        { className: 'badge' },
                        tag
                    );
                });
            }

            var children = [];
            if (node.nodes) {
                var _this = this;
                var nodes = [];
                node.nodes.forEach(function (node, index) {
                    nodes.push(React.createElement(TreeNode, { key: index,
                        index: index,
                        serial: serial,
                        serialNumber: _this.props.serialNumber,
                        node: node,
                        level: _this.props.level + 1,
                        visible: _this.state.expanded && _this.props.visible,
                        options: options }));
                });
                children.push(React.createElement(
                    'ul',
                    { key: node.nodeId },
                    nodes
                ));
            }

            return React.createElement(
                'li',
                { key: node.nodeId,
                    className: 'list-group-item' },
                serialText,
                nodeText,
                children
            );
        }
    });

    return {
        Tree: Tree
    };
})());