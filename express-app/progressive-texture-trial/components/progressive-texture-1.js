AFRAME.registerComponent('progressive-texture-1', {
    schema: {
        previewImg: {type: 'asset'},
        detailedImg: {type: 'asset'},
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
            this.switchSrc(this.isProbeCloseBy);
        }

        this.lastIsProbeCloseBy = this.isProbeCloseBy;        
        console.log(distanceOfProbeSquared);
    },

    switchSrc(isProbeCloseBy) {
        var imgToUse = isProbeCloseBy ?
            this.data.detailedImg : this.data.previewImg;
        
        console.log(imgToUse);
        this.setSrc(imgToUse.getAttribute('src'));
    },

    setSrc: function (src) {
        this.el.setAttribute('src', src);
    }
});