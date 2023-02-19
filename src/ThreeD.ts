import {
  Bitmap,
  BitmapData,
  Loader,
  LoaderInfo,
  Sprite,
  Stage3D,
} from "@flashport/flashport";
import { Context3D } from "@flashport/flashport";
import { Context3DTextureFormat } from "@flashport/flashport";
import { Context3DVertexBufferFormat } from "@flashport/flashport";
import { IndexBuffer3D } from "@flashport/flashport";
import { Program3D } from "@flashport/flashport";
import { Texture } from "@flashport/flashport";
import { VertexBuffer3D } from "@flashport/flashport";
import { AEvent } from "@flashport/flashport";
import { Matrix, Matrix3D, Vector3D } from "@flashport/flashport";
import { URLLoader } from "@flashport/flashport";
import { URLRequest } from "@flashport/flashport";
import { TextField, TextFormat } from "@flashport/flashport";
import { ByteArray } from "@flashport/flashport";
import { getTimer } from "@flashport/flashport";

export class ThreeD extends Sprite {
  private mainStage: Stage3D;
  private ctx: Context3D;
  private ibuffer: IndexBuffer3D;
  private matr: Matrix3D = new Matrix3D();
  private bmd: BitmapData;
  private vmatr: Matrix3D = new Matrix3D();
  private pmatr: Matrix3D = new Matrix3D();
  private vcode: string;
  private fcode: string;
  private meshs: Mesh[] = [];
  private lightPos: number[] = [0, 20, -10, 0];
  private lightColor: number[] = [1, 1, 1, 1];

  constructor() {
    super();

    let radians: number = (Math.PI / 180) * 45;
    let btMat: Matrix = new Matrix();
    btMat.createGradientBox(500, 500, radians);

    this.graphics.lineStyle(3, 0x00a3d9);
    this.graphics.beginGradientFill(
      "linear",
      [0x464646, 0xffffff],
      [0.3, 0.43],
      [0, 255],
      btMat
    );
    this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

    let txt: TextField = new TextField();
    txt.defaultTextFormat = new TextFormat("Arial", 22, 0xffffff);
    txt.text = "3D graphics using WebGL and GLSL shaders.";
    txt.y = this.height + 20;
    txt.x = (this.width - txt.textWidth) / 2;
    this.addChild(txt);

    let loader: Loader = new Loader();
    loader.contentLoaderInfo.addEventListener(
      AEvent.COMPLETE,
      this.handleLoaderComplete
    );
    loader.load(new URLRequest("assets/wood.jpg"));
    //this.addChild(new Stats);

    this.addEventListener(
      AEvent.REMOVED_FROM_STAGE,
      this.handleRemovedFromStage
    );

    this.addEventListener(AEvent.ADDED_TO_STAGE, this.handleAddedToStage);
  }

  private handleAddedToStage = (e: AEvent): void => {
    if (this.mainStage) this.mainStage.canvas.style.display = "block";
  };

  private handleRemovedFromStage = (e: AEvent): void => {
    if (this.mainStage) this.mainStage.canvas.style.display = "none";
  };

  private handleLoaderComplete = (e: AEvent): void => {
    const target: LoaderInfo = e.currentTarget as LoaderInfo;
    this.bmd = (target.content as Bitmap).bitmapData;

    var loader: URLLoader = new URLLoader(
      new URLRequest("assets/glsl/per-fragment-lighting.vert")
    );
    loader.addEventListener(AEvent.COMPLETE, this.vertLoaded);
  };

  private vertLoaded = (e: AEvent): void => {
    var loader: URLLoader = e.currentTarget as URLLoader;
    this.vcode = loader.data + "";
    loader = new URLLoader(
      new URLRequest("assets/glsl/per-fragment-lighting.frag")
    );
    loader.addEventListener(AEvent.COMPLETE, this.fragLoaded);
  };

  private fragLoaded = (e: AEvent): void => {
    var loader: URLLoader = e.currentTarget as URLLoader;
    this.fcode = loader.data + "";

    this.mainStage = this.stage.stage3Ds[0];
    this.mainStage.addEventListener(
      AEvent.CONTEXT3D_CREATE,
      this.context3dCreated
    );
    this.mainStage.requestContext3D();
  };

  private context3dCreated = (e: AEvent): void => {
    this.mainStage.canvas.style.display = "none";
    this.mainStage.canvas.style.zIndex = "1";
    this.mainStage.canvas.style.left = (this.stage.stageWidth - 496) / 2 + "px";
    this.mainStage.canvas.style.top = 252 + "px";
    this.mainStage.canvas.style.borderRadius = "11px";
    this.ctx = this.mainStage.context3D;
    this.ctx.configureBackBuffer(496, 496, 16);

    //init texture
    var texture: Texture = this.ctx.createTexture(
      this.bmd.width,
      this.bmd.height,
      Context3DTextureFormat.BGRA,
      false
    );
    texture.uploadFromBitmapData(this.bmd, 3); // 3 levels of mipmaps

    //init shader

    var vb: ByteArray = new ByteArray();
    vb.writeUTFBytes(this.vcode);
    var fb: ByteArray = new ByteArray();
    fb.writeUTFBytes(this.fcode);

    var program: Program3D = this.ctx.createProgram();
    program.upload(vb, fb);

    //init buffer
    var posData: number[] =
      // Front face
      [
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
        // Right face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
      ];
    var posBuffer: VertexBuffer3D = this.ctx.createVertexBuffer(
      posData.length / 3,
      3
    );
    posBuffer.uploadFromVector(posData, 0, posData.length / 3);

    var normData: number[] = [
      // Front face
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

      // Back face
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

      // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

      // Bottom face
      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

      // Right face
      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

      // Left face
      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
    ];
    var normBuffer: VertexBuffer3D = this.ctx.createVertexBuffer(
      normData.length / 3,
      3
    );
    normBuffer.uploadFromVector(normData, 0, normData.length / 3);

    var uvData: number[] = [
      // Front face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Back face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
      // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
      // Bottom face
      1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
      // Right face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
      // Left face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ];
    var uvBuffer: VertexBuffer3D = this.ctx.createVertexBuffer(
      uvData.length / 2,
      2
    );
    uvBuffer.uploadFromVector(uvData, 0, uvData.length / 2);
    var iData: number[] = [
      0,
      1,
      2,
      0,
      2,
      3, // Front face
      4,
      5,
      6,
      4,
      6,
      7, // Back face
      8,
      9,
      10,
      8,
      10,
      11, // Top face
      12,
      13,
      14,
      12,
      14,
      15, // Bottom face
      16,
      17,
      18,
      16,
      18,
      19, // Right face
      20,
      21,
      22,
      20,
      22,
      23,
    ]; // Left face;
    var ibuffer: IndexBuffer3D = this.ctx.createIndexBuffer(iData.length);
    ibuffer.uploadFromVector(iData, 0, iData.length);

    this.addEventListener(AEvent.ENTER_FRAME, this.update);

    for (var i: number = 0; i < 100; i++) {
      var mesh: Mesh = new Mesh();
      mesh.ibuffer = ibuffer;
      mesh.mmatr = new Matrix3D();
      mesh.normBuffer = normBuffer;
      mesh.posBuffer = posBuffer;
      mesh.program = program;
      mesh.texture = texture;
      mesh.uvBuffer = uvBuffer;
      mesh.mmatr.appendRotation(360 * Math.random(), Vector3D.X_AXIS);
      mesh.mmatr.appendRotation(360 * Math.random(), Vector3D.Y_AXIS);
      mesh.mmatr.appendRotation(360 * Math.random(), Vector3D.Z_AXIS);
      mesh.mmatr.prependTranslation(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      this.meshs.push(mesh);
    }
  };

  private perspectiveFieldOfViewLH = (
    fieldOfViewY: number,
    aspectRatio: number,
    zNear: number,
    zFar: number
  ): number[] => {
    var yScale: number = 1.0 / Math.tan(fieldOfViewY / 2.0);
    var xScale: number = yScale / aspectRatio;
    return [
      xScale,
      0.0,
      0.0,
      0.0,
      0.0,
      yScale,
      0.0,
      0.0,
      0.0,
      0.0,
      zFar / (zFar - zNear),
      1.0,
      0.0,
      0.0,
      (zNear * zFar) / (zNear - zFar),
      0.0,
    ];
  };

  private update = (e: AEvent): void => {
    //draw
    this.pmatr.copyRawDataFrom(
      this.perspectiveFieldOfViewLH(Math.PI / 4, 500 / 500, 0.1, 100000)
    );
    this.vmatr.identity();
    this.vmatr.appendTranslation(0, 0, -30);
    this.vmatr.appendRotation(getTimer() / 100, Vector3D.Y_AXIS);
    this.vmatr.invert();

    this.ctx.clear(0.53, 0.77, 0.96, 1);
    //draw
    var first: Boolean = true;
    for (let i: number = 0; i < this.meshs.length; i++) {
      const mesh = this.meshs[i];
      this.ctx.setProgram(mesh.program);
      var mmatr: Matrix3D = mesh.mmatr;

      if (first) {
        first = false;
        this.ctx.setTextureAtGL("uSampler", 0, mesh.texture);
        this.ctx.setVertexBufferAtGL(
          "aVertexPosition",
          mesh.posBuffer,
          0,
          Context3DVertexBufferFormat.FLOAT_3
        );
        this.ctx.setVertexBufferAtGL(
          "aVertexNormal",
          mesh.normBuffer,
          0,
          Context3DVertexBufferFormat.FLOAT_3
        );
        this.ctx.setVertexBufferAtGL(
          "aTextureCoord",
          mesh.uvBuffer,
          0,
          Context3DVertexBufferFormat.FLOAT_2
        );

        this.ctx.setProgramConstantsFromMatrixGL("uVMatrix", this.vmatr, false);
        this.ctx.setProgramConstantsFromMatrixGL("uPMatrix", this.pmatr, false);
        var gl: WebGLRenderingContext = mesh.program.gl;
        //draw
        gl.uniform1f(
          mesh.program.getUniformLocation("uMaterialShininess"),
          mesh.specular[0]
        );
        gl.uniform1i(
          mesh.program.getUniformLocation("uShowSpecularHighlights"),
          1
        );
        gl.uniform1i(mesh.program.getUniformLocation("uUseTextures"), 1);
        gl.uniform1i(mesh.program.getUniformLocation("uUseLighting"), 1);
        gl.uniform3f(
          mesh.program.getUniformLocation("uAmbientColor"),
          mesh.ambient[0],
          mesh.ambient[1],
          mesh.ambient[2]
        );
        gl.uniform3f(
          mesh.program.getUniformLocation("uPointLightingLocation"),
          this.lightPos[0],
          this.lightPos[1],
          this.lightPos[2]
        );
        gl.uniform3f(
          mesh.program.getUniformLocation("uPointLightingSpecularColor"),
          1,
          1,
          1
        );
        gl.uniform3f(
          mesh.program.getUniformLocation("uPointLightingDiffuseColor"),
          this.lightColor[0],
          this.lightColor[1],
          this.lightColor[2]
        );
      }
      this.ctx.setProgramConstantsFromMatrixGL("uMMatrix", mmatr, false);

      this.ctx.drawTriangles(mesh.ibuffer, 0);
    }
    this.ctx.present();
  };
}

class Mesh {
  public ibuffer: IndexBuffer3D;
  public mmatr: Matrix3D = new Matrix3D();
  public texture: Texture;
  public program: Program3D;
  public normBuffer: VertexBuffer3D;
  public uvBuffer: VertexBuffer3D;
  public posBuffer: VertexBuffer3D;
  public specular: number[] = [30, 0, 0, 0];
  public ambient: number[] = [0.5, 0.5, 0.5, 1];
  constructor() {}
}
