# Starbase Coding Agent Guidelines

## Overview

This document provides guidelines for AI coding agents working on the Starbase project. These instructions ensure consistent, high-quality contributions that align with project principles.

## Core Principles

1. **NEVER INCLUDE TIMELINE ESTIMATES** - Do not include dates, weeks, months, or any time-based estimates in any documentation or planning.

2. **Focus on Functionality** - Organize work by features and capabilities, not by time periods.

3. **Prioritize Performance** - Starbase is a high-performance system; code accordingly.

4. **Preserve Data Fidelity** - Never transform log data unnecessarily.

5. **Think Distributed** - Design all components to work in a distributed environment.

6. **Write Modern, Clean Code** - Follow principles from "Clean Code" (Robert C. Martin) and "Beautiful Code" (Andy Oram & Greg Wilson) as guiding sources for development practices.

## Modern Code Standards

Embrace contemporary coding patterns that prioritize readability, maintainability, and performance. Follow the principles of "Clean Code" and "Beautiful Code" in all implementations.

### Rust Components

For performance-critical components (e.g., router), use modern Rust idioms:

```rust
// Modern Rust patterns
// 1. Zero-copy and reference semantics
let data = input.as_bytes(); // Use references instead of cloning
let view = &data[start..end]; // Slice data without copying

// 2. Modern async/await syntax
async fn process_logs(logs: &[LogEntry]) -> Result<(), Error> {
    for chunk in logs.chunks(BATCH_SIZE) {
        stream::iter(chunk)
            .map(|log| async move { process_log(log).await })
            .buffer_unordered(CONCURRENCY_LIMIT)
            .collect::<Vec<_>>()
            .await;
    }
    Ok(())
}

// 3. Expressive error handling with thiserror
#[derive(Debug, Error)]
enum ParseError {
    #[error("invalid timestamp: {0}")]
    InvalidTimestamp(String),
    #[error("missing required field: {0}")]
    MissingField(String),
}

// 4. Builder pattern for complex objects
Log::builder()
    .timestamp(now())
    .source("router")
    .severity(Severity::Info)
    .message("Processing complete")
    .field("duration_ms", duration.as_millis())
    .build()?
```

### Python Components

For utility components (e.g., generators, tools), use modern Python practices:

```python
# Modern Python patterns
# 1. Type hints with modern syntax
from typing import Dict, List, Any, Optional

def generate_logs(
    count: int, 
    template: Dict[str, Any], 
    batch_size: Optional[int] = None
) -> List[Dict[str, Any]]:
    """Generate synthetic logs based on template.
    
    Args:
        count: Number of logs to generate
        template: Base template for generated logs
        batch_size: Optional batch size for generation
        
    Returns:
        List of generated log entries
    """
    return [create_log(template) for _ in range(count)]

# 2. Modern configuration with Pydantic
from pydantic import BaseSettings, Field

class Settings(BaseSettings):
    api_key: str = Field(..., env="API_KEY")
    endpoint: str = Field("http://localhost:8080", env="ENDPOINT")
    batch_size: int = Field(100, env="BATCH_SIZE")
    
    class Config:
        env_file = ".env"

config = Settings()

# 3. Structured logging with contextvars
import logging
import json
from contextvars import ContextVar

request_id: ContextVar[str] = ContextVar("request_id")

def log_event(message: str, **kwargs):
    """Log structured event with context."""
    logging.info(json.dumps({
        "message": message,
        "request_id": request_id.get("unknown"),
        **kwargs
    }))
```

## Architecture Guidelines

1. **Component Separation**
   - Each component should have a single responsibility
   - Use clear interfaces between components
   - Avoid tight coupling

2. **Data Flow**
   - Minimize data transformations
   - Use streaming patterns for large datasets
   - Consider backpressure mechanisms

3. **Storage Patterns**
   - Format-specific storage locations
   - Time-based partitioning
   - Metadata separate from raw data

## Documentation Requirements

1. **Component Documentation**
   - Purpose and responsibility
   - Interface definition
   - Configuration options
   - Performance characteristics
   - NO TIMELINE ESTIMATES

2. **Code Documentation**
   - Function/method purpose
   - Parameter descriptions
   - Return value descriptions
   - Error conditions
   - Examples where appropriate

## Testing Approach

1. **Unit Tests**
   - Test each component in isolation
   - Mock external dependencies
   - Focus on behavior, not implementation

2. **Performance Tests**
   - Measure throughput
   - Measure latency
   - Test with realistic data volumes

3. **Integration Tests**
   - Test component interactions
   - Use containerized environment
   - Verify end-to-end flows

## Contribution Workflow

1. **Feature Implementation**
   - Understand requirements
   - Design component interfaces
   - Implement with tests
   - Document thoroughly

2. **Code Review**
   - Verify performance characteristics
   - Check error handling
   - Ensure documentation completeness
   - Validate test coverage

## Common Pitfalls to Avoid

1. **Performance Issues**
   - Unnecessary data copying
   - Blocking I/O in critical paths
   - Inefficient algorithms
   - Lack of batching

2. **Scalability Problems**
   - Hardcoded limits
   - Single points of bottleneck
   - Insufficient parallelism
   - Lack of backpressure handling

3. **Documentation Mistakes**
   - Including timeline estimates (NEVER DO THIS)
   - Vague interface descriptions
   - Missing configuration options
   - Undocumented error conditions

## Example: Router Component

A well-implemented router component would:

1. Use Rust for performance
2. Implement zero-copy processing
3. Use async I/O for network operations
4. Batch logs for efficient S3 uploads
5. Include comprehensive metrics
6. Have thorough documentation WITHOUT timelines
7. Include performance tests showing throughput

Remember: Focus on capabilities and features, not on when they will be delivered.
