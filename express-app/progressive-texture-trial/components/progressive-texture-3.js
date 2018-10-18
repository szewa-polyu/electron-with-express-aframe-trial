var numOfAppendTimes = 0;

AFRAME.registerComponent('progressive-texture-3', {
    schema: {
        fadeForwardEvent: {type: 'string'},
        fadeBackwardEvent: {type: 'string'},
        previewImg: {type: 'asset'},
        detailedImg: {type: 'asset'},
        thresholdDistance: {type: 'number'},
        probeObject: {type: 'selector'}
    },

    init: function () {
        this.isProbeCloseBy = false;
        this.lastIsProbeCloseBy = false;
        this.thresholdDistanceSquared = this.data.thresholdDistance * this.data.thresholdDistance;

        // this.copiedObject = this.el.cloneNode(true);
        
        // console.log(this.copiedObject);
        // console.log(this.el);

        // this.copiedObject.id = 'sphere2';
        
        // if (numOfAppendTimes < 1) {
        //     numOfAppendTimes++;
        //     this.el.appendChild(this.copiedObject);
        // }
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
    },

    triggerFade(isProbeCloseBy) {
        var eventToTrigger = (isProbeCloseBy ?
            this.data.fadeForwardEvent : this.data.fadeBackwardEvent);
        
        console.log(this.el.id + ' ' + eventToTrigger);
        this.el.emit(eventToTrigger);
    },
});