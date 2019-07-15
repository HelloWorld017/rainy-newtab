<template>
	<label class="Dropzone" :class="{'Dropzone--drop': isDragOver}"
		@dragover="dragOver" @dragleave="dragLeave" @drop="drop">

		<input class="Dropzone__upload" type="file" ref="upload" @change="handleUploadDialog">
		<i class="Dropzone__icon mdi mdi-plus"></i>
		<slot></slot>
	</label>
</template>

<style lang="less" scoped>
	.Dropzone {
		background: #eaebec;
		cursor: pointer;
		box-sizing: border-box;
		outline: none;

		font-family: inherit;
		font-size: 1rem;
		width: 100%;

		transition: all .4s ease;

		* {
			pointer-events: none;
		}

		&&--drop {
			background: #00bcd4;
			color: #f1f2f3;
		}

		&__icon {
			font-size: 1.5rem;
			margin-right: 10px;
		}

		&__upload {
			position: absolute;
			visibility: hidden;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				isDragOver: false
			};
		},

		methods: {
			handleUploadTransfer(dataTransfer) {
				let blob = null;

				for(let item of dataTransfer.items) {
					if(item.kind !== 'file') continue;
					blob = item.getAsFile();
					break;
				}

				if(blob) {
					this.handleUpload(blob);
				}
			},

			handleUploadDialog(event) {
				const files = this.$refs.upload.files;
				if(!files) return;
				if(files.length < 1) return;

				this.handleUpload(files[0]);
				this.$refs.upload.value = '';
			},

			handleUpload(file) {
				this.$emit('upload', file);
			},

			handleDrag(ev) {
				ev.preventDefault();
				ev.stopPropagation();
			},

			dragOver(ev) {
				this.handleDrag(ev);
				this.isDragOver = true;
			},

			dragLeave(ev) {
				this.handleDrag(ev);
				this.isDragOver = false;
			},

			drop(ev) {
				this.handleDrag(ev);
				this.isDragOver = false;

				if(ev.dataTransfer) {
					this.handleUploadTransfer(ev.dataTransfer);
				}
			}
		}
	};
</script>
