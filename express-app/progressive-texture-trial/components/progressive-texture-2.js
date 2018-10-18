AFRAME.registerComponent('progressive-texture-2', {
    schema: {
        fadeForwardEvent: {type: 'string'},
        fadeBackwardEvent: {type: 'string'},
        thresholdDistance: {type: 'number'},
        probeObject: {type: 'selector'}
    },

    init: function () {
        this.isProbeCloseBy = false;
        this.lastIsProbeCloseBy = false;
        this.thresholdDistanceSquared = this.data.thresholdDistance * this.data.thresholdDistance;
    },

    tick: function (time, timeDelta) {
        var data = this.data;

        var probePosition = data.probeObject.object3D.getWorldPosition();
        var thisPosition = this.el.object3D.getWorldPosition();
        
        var distanceOfProbeSquared = thisPosition.distanceToSquared(probePosition);
        this.isProbeCloseBy = distanceOfProbeSquared < this.thresholdDistanceSquared;

        if (this.isProbeCloseBy !== this.lastIsProbeCloseBy) {
            this.triggerFade(this.isProbeCloseBy);
        }

        this.lastIsProbeCloseBy = this.isProbeCloseBy;        
        
        //console.log(distanceOfProbeSquared);

        // if (this.el.id === 'sphere1') {
        //     console.log(this.el.getAttribute('material').opacity);
        // }
    },

    triggerFade(isProbeCloseBy) {
        var eventToTrigger = this.el.id + '-' + (isProbeCloseBy ?
            this.data.fadeForwardEvent : this.data.fadeBackwardEvent);
        
        console.log(eventToTrigger);
        this.el.emit(eventToTrigger);
    },
});