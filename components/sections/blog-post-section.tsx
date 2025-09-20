"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from "lucide-react"
import Link from "next/link"

interface BlogPostSectionProps {
  slug: string
}

// This would typically come from a CMS or database
const getBlogPost = (slug: string) => {
  const posts = {
    "arbitrum-gas-optimization-guide": {
      title: "Advanced Gas Optimization Techniques for Arbitrum Smart Contracts",
      excerpt:
        "Learn how to minimize gas costs and optimize your smart contracts for Arbitrum's Layer 2 environment with proven techniques and best practices.",
      author: "Arbix Development Team",
      date: "2024-01-15",
      readTime: "12 min read",
      category: "Development",
      tags: ["Gas Optimization", "Smart Contracts", "Arbitrum", "Layer 2"],
      content: `
# Advanced Gas Optimization Techniques for Arbitrum Smart Contracts

Gas optimization is crucial for building efficient smart contracts on Arbitrum. This comprehensive guide covers advanced techniques to minimize gas costs while maintaining functionality and security.

## Understanding Arbitrum Gas Model

Arbitrum uses a unique gas model that differs from Ethereum mainnet. Understanding these differences is key to effective optimization:

### Key Differences
- **L2 Gas**: Computational costs on Arbitrum
- **L1 Gas**: Data posting costs to Ethereum mainnet
- **ArbGas**: Arbitrum's internal gas unit

## Optimization Strategies

### 1. Storage Optimization

Efficient storage usage can significantly reduce gas costs:

\`\`\`solidity
// Inefficient: Multiple storage slots
struct UserData {
    uint256 balance;
    uint256 timestamp;
    bool isActive;
    uint8 level;
}

// Optimized: Packed into fewer slots
struct OptimizedUserData {
    uint128 balance;      // 16 bytes
    uint64 timestamp;     // 8 bytes
    bool isActive;        // 1 byte
    uint8 level;          // 1 byte
    // Total: 26 bytes (fits in 1 slot with padding)
}
\`\`\`

### 2. Function Optimization

Optimize function calls and data access patterns:

\`\`\`solidity
// Use memory for temporary calculations
function calculateRewards(uint256[] calldata amounts) external pure returns (uint256) {
    uint256 total = 0;
    uint256 length = amounts.length;
    
    for (uint256 i = 0; i < length;) {
        total += amounts[i];
        unchecked { ++i; }
    }
    
    return total;
}
\`\`\`

### 3. Batch Operations

Combine multiple operations to reduce transaction overhead:

\`\`\`solidity
function batchTransfer(
    address[] calldata recipients,
    uint256[] calldata amounts
) external {
    require(recipients.length == amounts.length, "Length mismatch");
    
    uint256 length = recipients.length;
    for (uint256 i = 0; i < length;) {
        _transfer(msg.sender, recipients[i], amounts[i]);
        unchecked { ++i; }
    }
}
\`\`\`

## Advanced Techniques

### Custom Errors vs Require Strings

Use custom errors instead of require strings to save gas:

\`\`\`solidity
// Expensive
require(balance >= amount, "Insufficient balance");

// Cheaper
error InsufficientBalance(uint256 available, uint256 required);
if (balance < amount) revert InsufficientBalance(balance, amount);
\`\`\`

### Assembly Optimizations

For critical paths, consider inline assembly:

\`\`\`solidity
function efficientHash(bytes32 a, bytes32 b) internal pure returns (bytes32 result) {
    assembly {
        mstore(0x00, a)
        mstore(0x20, b)
        result := keccak256(0x00, 0x40)
    }
}
\`\`\`

## Testing and Measurement

Always measure gas usage before and after optimizations:

\`\`\`javascript
// Hardhat gas reporter configuration
module.exports = {
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 0.1, // Arbitrum gas price in gwei
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
\`\`\`

## Best Practices Summary

1. **Pack structs efficiently** to minimize storage slots
2. **Use unchecked arithmetic** where overflow is impossible
3. **Batch operations** to reduce transaction overhead
4. **Prefer custom errors** over require strings
5. **Cache storage reads** in memory variables
6. **Use events** for data that doesn't need on-chain storage

## Conclusion

Gas optimization on Arbitrum requires understanding both the L2 execution environment and L1 data costs. By applying these techniques systematically, you can significantly reduce the cost of your smart contracts while maintaining their functionality and security.

For more advanced optimization techniques, consult the Arbitrum documentation and consider using tools like the Arbix IDE's built-in gas analyzer.
      `,
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export function BlogPostSection({ slug }: BlogPostSectionProps) {
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl font-bold mb-4 text-balance">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">{post.excerpt}</p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Technical Guide</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share Button */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
            </div>
          </CardContent>
        </Card>

        {/* Article Footer */}
        <div className="mt-12 text-center">
          <Separator className="mb-8" />
          <p className="text-muted-foreground mb-4">Found this article helpful? Share it with your development team.</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share on Twitter
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
