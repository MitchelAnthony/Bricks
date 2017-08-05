//export { MotionController }

var MotionController = {

    __worldDirection: new THREE.Vector3(),
    __orthogonalVector: new THREE.Vector3(),
    yAxisUnitVector: new THREE.Vector3(0, 1, 0),
    q: new THREE.Quaternion(),
    controlledObject: null,

    /*
     * Set the object to be controlled by this MotionController
     */
    setControlledObject(cObj) {
        this.controlledObject = cObj;
    },

    /*
     * Longitudinal movement
     */
    moveForward(units = 1) {
        this.controlledObject.position.add(this.worldDirection.multiplyScalar(units));
    },

    moveBackward(units = 1) {
        // Negate for backwards movement
        this.controlledObject.position.add(this.worldDirection.multiplyScalar(units).negate());
    },

    /*
     * Lateral movement
     */
    moveLeft(units = 1) {
        // Negate for leftwards movement
        this.controlledObject.position.add(this.orthogonalVector.multiplyScalar(units).negate());
    },

    moveRight(units = 1) {
        this.controlledObject.position.add(this.orthogonalVector.multiplyScalar(units));
    },

    /*
     * Vertical rotation (yaw)
     */
    lookLeft(radians = 0.05) {
        // Define a counter clockwise rotation around the y-axis
        this.q.setFromAxisAngle(this.yAxisUnitVector, radians * Math.PI);
        this.controlledObject.applyQuaternion(this.q);
    },

    lookRight(radians = 0.05) {
        // Define a clockwise (negative radians) rotation around the y-axis
        this.q.setFromAxisAngle(this.yAxisUnitVector, radians * -1 * Math.PI);
        this.controlledObject.applyQuaternion(this.q);
    },

    /*
     * Lateral rotation (pitch)
     */
    lookUp(radians = 0.05) {
        // Define a counter clockwise rotation around the axis orthogonal to the world direction and y-axis
        this.q.setFromAxisAngle(this.orthogonalVector, radians * Math.PI);
        this.controlledObject.applyQuaternion(this.q);
    },

    lookDown(radians = 0.05) {
        // Define a clockwise (negative radians) rotation around the axis orthogonal to the world direction and y-axis
        this.q.setFromAxisAngle(this.orthogonalVector, radians * -1 * Math.PI);
        this.controlledObject.applyQuaternion(this.q);
    },

    /*
     * Helper methods
     */
     get worldDirection() {
         // Update and return the world direction
         this.controlledObject.getWorldDirection(this.__worldDirection);
         return this.__worldDirection;
     },

     get orthogonalVector() {
         // Update and return the vector orthogonal to both the world direction and the y-axis
         this.__orthogonalVector = this.__orthogonalVector.crossVectors(this.worldDirection, this.yAxisUnitVector);
         return this.__orthogonalVector;
     }
}
