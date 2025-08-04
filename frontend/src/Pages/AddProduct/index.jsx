import "./index.css";
import { ImageIcon, X, Plus, Minus } from 'lucide-react';
import { useAddProductLogic } from './logic';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Shared/Adminnavbar";

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    formData,
    isLoading,
    error,
    successMessage,
    imagePreview,
    handleChange,
    handleImageUpload,
    handleRemoveImage,
    handleQuantityChange,
    handleSubmit,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragOver,
    fileInputRef,
  } = useAddProductLogic();

  return (
    <div>

<Navbar activeLink="AddProduct" />

      <main className="ap-main-content">
        <div className="ap-product-card">
          <h1 className="ap-card-title">Add a new Product</h1>
          
          {successMessage && (
            <div className="ap-success-message">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="ap-error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="ap-form-container">

              <div className="ap-form-left">
                <div className="ap-form-group">
                  <label className="ap-form-label">Product Name</label>
                  <input
                    type="text"
                    className="ap-form-input"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ap-form-group">
                  <label className="ap-form-label">Description</label>
                  <textarea
                    className="ap-form-input ap-form-textarea"
                    name="description"
                    placeholder="Enter a description for your product"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ap-form-group">
                  <label className="ap-form-label">Product Price</label>
                  <input
                    type="number"
                    className="ap-form-input"
                    name="price"
                    placeholder="$0.00"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

     
              <div className="ap-form-right">
                <div className="ap-form-group">
                  <label className="ap-form-label">Product Image</label>
                  <div
                    className={`ap-image-upload ${isDragOver ? 'ap-dragover' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="ap-image-preview"
                        />
                        <button
                          type="button"
                          className="ap-remove-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                        >
                          <X size={12} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="ap-upload-icon">
                          <ImageIcon size={48} />
                        </div>
                        <div className="ap-upload-text">
                          Drop your image here or{' '}
                          <span className="ap-upload-link">click to browse</span>
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="ap-hidden-input"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="ap-quantity-container">
                  <span className="ap-quantity-label">Quantity</span>
                  <div className="ap-quantity-controls">
                    <button
                      type="button"
                      className="ap-quantity-btn"
                      onClick={() => handleQuantityChange(formData.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      className="ap-quantity-input"
                      value={formData.quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    <button
                      type="button"
                      className="ap-quantity-btn"
                      onClick={() => handleQuantityChange(formData.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="ap-form-actions">
                <button
                  type="button"
                  className="ap-btn ap-btn-cancel"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ap-btn ap-btn-create"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;