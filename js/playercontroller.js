//export { PlayerController }

var PlayerController = {

    __worldDirection: new THREE.Vector3(),
    __orthogonalVector: new THREE.Vector3(),
    yAxisUnitVector: new THREE.Vector3(0, 1, 0),
    q: new THREE.Quaternion(),

    // TODO: Remove hardcoded camera reference
    // TODO: Add default arguments to allow different step sizes

    /*
     * Longitudinal movement
     */
    moveForward() {
        camera.position.add(this.worldDirection);
    },

    moveBackward() {
        // Negate for backwards movement
        camera.position.add(this.worldDirection.negate());
    },

    /*
     * Lateral movement
     */
    moveLeft() {
        // Negate for leftwards movement
        camera.position.add(this.orthogonalVector.negate());
    },

    moveRight() {
        camera.position.add(this.orthogonalVector);
    },

    /*
     * Vertical rotation (yaw)
     */
    lookLeft() {
        // Define a counter clockwise rotation around the y-axis
        this.q.setFromEuler(new THREE.Euler(0, 0.05 * Math.PI, 0));
        camera.applyQuaternion(this.q);
    },

    lookRight() {
        // Define a clockwise (negative radians) rotation around the y-axis
        this.q.setFromEuler(new THREE.Euler(0, -0.05 * Math.PI, 0));
        camera.applyQuaternion(this.q);
    },

    /*
     * Lateral rotation (pitch)
     */
    lookUp() {
        // Define a counter clockwise rotation around the axis orthogonal to the world direction and y-axis
        this.q.setFromAxisAngle(this.orthogonalVector, 0.05 * Math.PI);
        camera.applyQuaternion(this.q);
    },

    lookDown() {
        // Define a clockwise (negative radians) rotation around the axis orthogonal to the world direction and y-axis
        this.q.setFromAxisAngle(this.orthogonalVector, -0.05 * Math.PI);
        camera.applyQuaternion(this.q);
    },

    /*
     * Helper methods
     */
     get worldDirection() {
         // Update and return camera world direction
         camera.getWorldDirection(this.__worldDirection);
         return this.__worldDirection;
     },

     get orthogonalVector() {
         // Update and return the vector orthogonal to both the world direction and the y-axis
         this.__orthogonalVector = this.__orthogonalVector.crossVectors(this.worldDirection, this.yAxisUnitVector);
         return this.__orthogonalVector;
     }
}
