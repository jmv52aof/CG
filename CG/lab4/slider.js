class Slider {
    constructor() {
        this._currentSlide = 0;
    }

    nextSlide() {
        this._currentSlide = Math.min(this._currentSlide + 1, 7);
    }

    draw(ctx) {
        switch (this._currentSlide) {
            case 7: this.#drawStage7(ctx);
            case 6: this.#drawStage6(ctx);
            case 5: this.#drawStage5(ctx);
            case 4: this.#drawStage4(ctx);
            case 3: this.#drawStage3(ctx);
            case 2: this.#drawStage2(ctx);
            case 1: this.#drawStage1(ctx);
            case 0: this.#drawStage0(ctx);
        }
    }

    #drawStage0(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(128, 51, 0, 0.65625)';
        ctx.lineWidth = 0.077849;
        ctx.rect(12.863285, 20.339211, 10.746108, 268.472440);
        ctx.fill();
    
        ctx.beginPath();
        ctx.fillStyle = 'rgba(85, 34, 0, 0.65625)';
        ctx.lineWidth = 0.070004;
        ctx.rect(11.398428, 5.167059, 162.759480, 16.096273);
        ctx.fill();
    }

    #drawStage1(ctx) {
        ctx.beginPath();
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = 'rgba(85, 34, 0, 0.65625)';
        ctx.lineWidth = 2.329437;
        ctx.rect(99.052452, 10.439975, 7.112573, 23.629417);
        ctx.fill();
    }

    #drawStage2(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65625)';
        ctx.lineWidth = 0.457734;
        ctx.arc(101.107390, 58.701035, 25.064070, 0.000000, 6.28318531, 1);
        ctx.fill();
    }

    #drawStage3(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65625)';
        ctx.lineWidth = 0.457734;
        ctx.moveTo(100.862510, 76.012920);
        ctx.lineTo(71.333925, 97.974988);
        ctx.lineTo(70.189688, 168.745680);
        ctx.lineTo(136.763760, 168.745680);
        ctx.lineTo(136.763760, 96.678614);
        ctx.closePath();
        ctx.fill();
    }

    #drawStage4(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65625)';
        ctx.lineWidth = 0.457734;
        ctx.rect(57.424503, 98.375137, 14.703111, 69.547096);
        ctx.fill();
    }

    #drawStage5(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65625)';
        ctx.lineWidth = 0.457734;
        ctx.rect(133.169010, 96.331390, 15.209088, 73.591614);
        ctx.fill();
    }

    #drawStage6(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65625)';
        ctx.lineWidth = 0.457734;
        ctx.moveTo(74.981594, 167.588230);
        ctx.lineTo(74.981594, 276.469260);
        ctx.lineTo(95.303366, 276.469260);
        ctx.lineTo(103.074920, 201.283670);
        ctx.lineTo(102.929400, 165.537870);
        ctx.closePath();
        ctx.fill();
    }

    #drawStage7(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65625)';
        ctx.lineWidth = 0.457734;
        ctx.moveTo(107.000370, 165.422130);
        ctx.lineTo(132.388540, 164.916160);
        ctx.lineTo(139.604510, 276.062530);
        ctx.lineTo(114.490830, 273.506180);
        ctx.lineTo(106.408410, 210.993180);
        ctx.closePath();
        ctx.fill();
    }
}